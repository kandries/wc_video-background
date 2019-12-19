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

  @Element() host: HTMLDivElement;

  @Prop() speed: number;

  /*
  * Private functions
  */
  isVideoInViewport() {
    const elementTop = this.videoWrapper.getBoundingClientRect().top;
    const elementBottom = this.videoWrapper.getBoundingClientRect().bottom;
    const viewportTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportBottom = viewportTop + window.innerHeight;

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };


  /*
  * Lifecycle hooks
  */
  @Listen('scroll', { target: 'window' })
  handleScroll() {
    console.log(this.isVideoInViewport());
  }


  /*
  * Lifecycle hooks
  */
  componentDidLoad() {
    const slotted = this.host.shadowRoot.querySelector('slot') as HTMLSlotElement;
    const video = slotted.assignedNodes().filter((node) => {
      return node.nodeName === 'VIDEO';
    });

    console.log(video);
  }


  /*
  * Render
  */
  render() {
    return (
      <div class="crn-video-background" ref={el => this.videoWrapper = el}>
        <slot />
      </div>
    )
  }
}
