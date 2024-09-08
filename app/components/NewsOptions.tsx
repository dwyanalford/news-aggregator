// app/components/NewsOptions.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBookmark, faShare, faEyeSlash, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsOptions = ({ link }: { link: string }) => {
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  };

  const copyLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevent the default behavior of the <a> tag
    navigator.clipboard.writeText(link).then(() => {
      toast.success('Link copied to clipboard!');
    });
  };

  return (
    <div className="flex space-x-10 mx-auto p-2">
      <a href={link} target="_blank" rel="noopener noreferrer" title="View Article">
        <FontAwesomeIcon icon={faExternalLinkAlt} className="news-icon" />
      </a>
      <a href="#" title="Share on Twitter" onClick={shareOnTwitter}>
        <FontAwesomeIcon icon={faTwitter} className="news-icon" />
      </a>
      <a href="#" title="Share on Facebook" onClick={shareOnFacebook}>
        <FontAwesomeIcon icon={faFacebook} className="news-icon" />
      </a>
      <a href="#" title="Share on LinkedIn" onClick={shareOnLinkedIn}>
        <FontAwesomeIcon icon={faLinkedin} className="news-icon" />
      </a>
      <a href="#" title="Copy Link" onClick={copyLink}>
        <FontAwesomeIcon icon={faShare} className="news-icon" />
      </a>
      <ToastContainer />
    </div>
  );
  
};

export default NewsOptions;