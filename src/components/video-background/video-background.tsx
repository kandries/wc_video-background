import { Component, Element, Prop, Listen, h } from '@stencil/core';

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
  @Prop() speed: number;

  /*
  * Private functions
  */
  isInViewport(el, percentVisible) {
    let
      rect = el.getBoundingClientRect(),
      windowHeight = (window.innerHeight || document.documentElement.clientHeight);

    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height)) * 100)) < percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
  };


  /*
  * Lifecycle hooks
  */
  @Listen('scroll', { target: 'window' })
  handleScroll() {
    const isVideoInViewport = this.isInViewport(this.videoElement, 0);
    console.log('video in viewport:', isVideoInViewport);
  }


  /*
  * Lifecycle hooks
  */
  componentDidLoad() {
    //
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
