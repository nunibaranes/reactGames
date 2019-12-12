import React, { Component } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  EmailShareButton,


  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
} from 'react-share';

class SahreButtons extends Component {
  props: any;
  state: any;
  constructor(props = {}) {
    super(props);
    this.state = {
        shareOptions: [
          {name:'FacebookShareButton', icon: 'FacebookIcon'},
          {name:'LinkedinShareButton', icon: 'LinkedinIcon'},
          {name:'TwitterShareButton', icon: 'TwitterIcon'},
          {name:'WhatsappShareButton', icon: 'WhatsappIcon'},
          {name:'PinterestShareButton', icon: 'PinterestIcon'},
          {name:'MailruShareButton', icon: 'MailruIcon'},
        ],
        siteDetails: {
          url: 'www.google.com',
          title: 'Hello World',
          description: 'Share buttons test'
        }
    };
  }

  render() {
    const { shareOptions, siteDetails } = this.state;
    return (
      <section className="share-buttons wrapper wrap-with-border">
        {
          // shareOptions.map(option => {
          //   const ShareTagName = option.name;
          //   const IconTagName = option.icon;
          //   console.log('ShareTagName ', ShareTagName)
          //   console.log('IconTagName ', IconTagName)
          //   return <ShareTagName url={siteDetails.url} quote={siteDetails.title}> 
          //     <IconTagName
          //       size={32}
          //       round />
          //   </ShareTagName>
          // })
          
          <FacebookShareButton url={this.state.siteDetails.url} quote="it works">
            <FacebookIcon
                size={32}
                round />
          </FacebookShareButton>
          
        }
      </section>
    );
  }
}

export default SahreButtons;
