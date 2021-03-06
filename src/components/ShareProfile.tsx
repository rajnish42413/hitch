import React, { useState } from 'react';
import { Button, message, Drawer } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from 'react-share';
import { ShareAltOutlined } from '@ant-design/icons';
import { FB_APP_ID } from '@constants/general';
import { convertToSlug } from '@utils/helpers';
// import { ReactComponent as ShareSvg } from '../assets/icons/share.svg';

interface IProps {
  name: string;
  profile_id: number;
}

export default function ShareProfile({ name, profile_id }: IProps) {
  const [webShare, setWebShare] = useState(false);
  const share_text = `Want to know more about ${name}?. \n`;
  const url = `https://www.pakkijodi.com/profiles/${profile_id}?name=${convertToSlug(name)}`;

  const handleShare = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: share_text,
          text: share_text,
          url: url,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch((err) => {
          console.log(`Couldn't share because of`, err.message);
        });
    } else {
      setWebShare(true);
    }
  };

  return profile_id ? (
    <>
      <ShareAltOutlined style={{ fontSize: '1rem', color: '#fff' }} onClick={handleShare} />
      <Drawer
        title="Share"
        placement="bottom"
        visible={webShare}
        onClose={() => setWebShare(false)}
        footer={null}
        height="50%"
      >
        <CopyToClipboard text={url} onCopy={() => message.success('copied')}>
          <Button block className="mb-1">
            Copy Link
          </Button>
        </CopyToClipboard>

        <WhatsappShareButton
          url={url}
          title={share_text}
          separator=":: "
          className="mb-1 btn-block ant-btn"
        >
          Share on Whatsapp
        </WhatsappShareButton>

        <FacebookMessengerShareButton
          url={url}
          appId={FB_APP_ID}
          className="mb-1 btn-block ant-btn"
        >
          {' '}
          Share on FacebookMessenger
        </FacebookMessengerShareButton>
        <FacebookShareButton quote={`${share_text}`} className="mb-1 btn-block ant-btn" url={url}>
          Share on Facebook
        </FacebookShareButton>
      </Drawer>
    </>
  ) : (
    <> </>
  );
}
