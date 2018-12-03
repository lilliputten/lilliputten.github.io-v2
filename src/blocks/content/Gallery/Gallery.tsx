import * as React from 'react';
import { cn } from '@bem-react/classname';

import { site as siteConfig } from 'config';

import LoadingSpinner from 'blocks/content/LoadingSpinner/LoadingSpinner';
import Error from 'blocks/content/Error/Error';

import './Gallery.css';

const ReactGridGallery = require('react-grid-gallery');
const imageSize = require('image-size');

const cnGallery = cn('Gallery');

export interface IGalleryProps {
  path?: string;
  id?: string;
  thumbWidth?: number;
  thumbHeight?: number;
  items: Array<any>;
}
export interface IGalleryItemProps {
  image: string;
  title: string;
  tags?: string[];
  thumbWidth?: number;
  thumbHeight?: number;
}
export interface IGalleryState {
  content?: any;
}

export default class Gallery extends React.Component<IGalleryProps, IGalleryState> {

  public block = 'Gallery';

  /** constructor ** {{{
   */
  constructor(props: IGalleryProps) {
    super(props);
    this.state = {};
  }/*}}}*/

  /** getResponeThumbSizesPromise ** {{{
   */
  getResponeThumbSizesPromise(res: any) {

    if (!res || res.status !== 200) {
      // tslint:disable-next-line no-console
      console.error('Gallery:getResponeThumbSizesPromise error (invalid response status)', res);
      debugger; // tslint:disable-line no-debugger
      // throw new Error(res);
      return Promise.reject({ error: 'Invalid response status for image thumbnail (' + res.status + ')' /*  + res.url */, details: res });
    }

    // Fetch buffer...
    return res.arrayBuffer()
      .then((data: any) => {
        // Create buffer
        const buf = new Buffer(data, 'binary');
        // Try to get sizes
        const sizes = imageSize(buf);
        return sizes;
      })
    ;

  }/*}}}*/
  /** fetchImageThumbSizesPromise ** {{{
   */
  fetchImageThumbSizesPromise(imageProps: any) {

    const {thumbnail, thumbnailWidth, thumbnailHeight} = imageProps;

    return new Promise((resolve, reject) => {

      if (!thumbnail) {
        // tslint:disable-next-line no-console
        console.error('Gallery:fetchImageThumbSizesPromise error (invalid thumbnail)');
        debugger; // tslint:disable-line no-debugger
        return reject({ error: 'Not specified thumbnail url in ' + JSON.stringify(imageProps) });
      }

      // If sizes already specified...
      if (thumbnailWidth && thumbnailHeight) {
        return resolve(imageProps);
      }

      // Prefetch images and resolve image sizes...
      fetch(thumbnail)
        .then((res) => {
          this.getResponeThumbSizesPromise(res)
            .then((sizes: any) => {
              return resolve({...imageProps,
                thumbnailWidth: sizes.width,
                thumbnailHeight: sizes.height,
              });
            })
            .catch((err: any) => {
              // tslint:disable-next-line no-console
              console.error('Gallery:fetchImageThumbSizesPromise image sizes loading error (promise catch)', err);
              debugger; // tslint:disable-line no-debugger
              reject({ error: 'Cannot fetch image data for image thumbnail'/*  + thumbnail */, details: err });
            })
          ;
        })
      ;
      return null;
    });

  }/*}}}*/

  /** fetchImageDataPromise ** {{{
   */
  private fetchImageDataPromise(itemProps: IGalleryItemProps) {

    const {image, title: caption, tags, thumbWidth, thumbHeight} = itemProps;
    const {path} = this.props;

    const url = path + image;
    const thumbnailWidth = thumbWidth || this.props.thumbWidth;
    const thumbnailHeight = thumbHeight || this.props.thumbHeight;
    const thumbnail = siteConfig.galleryThumb({url, width: thumbnailWidth, height: thumbnailHeight});
    const src = siteConfig.galleryImage({url});

    const tagsList = Array.isArray(tags) ? tags.map((tag) => ({value: tag, title: tag})) : undefined;

    const imageProps = {
      caption,
      src,
      thumbnail,
      thumbnailWidth,
      thumbnailHeight,
      tags: tagsList,
    };

    return this.fetchImageThumbSizesPromise(imageProps);

  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {

    const {items} = this.props;

    // Fetch all image thumb and their sizes
    const imagePromises = items.map((props) => this.fetchImageDataPromise(props));

    // Process all image properties or thrown error...
    Promise.all(imagePromises)
      .then((images) => {
        // @see https://github.com/benhowell/react-grid-gallery#image-options
        const imagesCount = images.length;
        this.setState({ content: (
          <ReactGridGallery
            enableImageSelection={false}
            backdropClosesModal={true}
            showLightboxThumbnails={imagesCount > 1}
            images={images}
          />
        )});
      })
      .catch((err) => {
        // tslint:disable-next-line no-console
        console.error('Gallery image sizes loading error (promise catch)', err);
        debugger; // tslint:disable-line no-debugger
        this.setState({ content: (<Error  error={{ error: 'Gallery error', details: err }} />) });
      })
    ;

  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    const {id} = this.props;
    return (
      <p className={cnGallery({ id })}>
        {this.state.content || (<LoadingSpinner />)}
      </p>
    );
  }/*}}}*/

}
