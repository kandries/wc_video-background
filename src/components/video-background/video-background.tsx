import { Component, Element, Prop, State, Listen, h } from '@stencil/core';

@Component({
  tag: 'crn-video-background',
  styleUrl: './video-background.css',
  shadow: true
})

export class VideoBackground {
  /*
  * Variables
  */
  videoWrapper: HTMLDivElement;
  videoElement: HTMLVideoElement;

  @Element() host: HTMLDivElement;

  @Prop() videoSource: string;

  @State() playbackSpeed: number;

  /*
  * Private functions
  */
  isInViewport(el, percentVisible) {
    const rect = el.getBoundingClientRect(),
          windowHeight = (window.innerHeight || document.documentElement.clientHeight);

    return (
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height)) * 100)) >= percentVisible &&
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) >= percentVisible
    )
  };

  getVideoLength() {
    const self = this;

    // Set the video duration in seconds when it's loaded
    let i = setInterval(function() {
      if(self.videoElement.readyState > 0) {
        const videoDuration = self.videoElement.duration % 60;
        const totalHeightToPlay = self.videoWrapper.clientHeight + window.innerHeight;
        self.playbackSpeed = Math.round(totalHeightToPlay / videoDuration);
        clearInterval(i);
      }
    }, 200);
  }

  setAnimationFrame() {
    const isVideoInViewport = this.videoElement && this.isInViewport(this.videoElement, 0);
    if(isVideoInViewport) {
      window.requestAnimationFrame(this.scrollPlay.bind(this));
    }
  }

  scrollPlay() {
    const elementTop = this.videoWrapper.getBoundingClientRect().top;
    const viewportBottom = window.screenY + window.innerHeight;
    const elementOffset = viewportBottom - elementTop;

    this.videoElement.currentTime = elementOffset / this.playbackSpeed;
  }

  /*
  * Lifecycle hooks
  */
  @Listen('scroll', { target: 'window' })
  handleScroll() {
    this.setAnimationFrame();
  }


  /*
  * Lifecycle hooks
  */
  componentDidLoad() {
    this.getVideoLength();
    //this.setAnimationFrame();
  }


  /*
  * Render
  */
  render() {
    return (
      <div class="crn-video-background" ref={el => this.videoWrapper = el}>
        <video id="background-video" class="background-video" preload="" ref={el => this.videoElement = el}>
          <source type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" src={this.videoSource} />
          <p>Sorry, your browser does not support the &lt;video&gt; element.</p>
        </video>
      </div>
    )
  }
}
