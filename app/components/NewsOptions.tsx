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
    <div className="flex space-x-4 mt-4 pl-4">
      <a href={link} target="_blank" rel="noopener noreferrer" title="View Article" className="text-blue-600 hover:text-blue-800">
        <FontAwesomeIcon icon={faExternalLinkAlt} className="h-5 w-5" />
      </a>
      <a href="#" title="Save" className="text-yellow-500 hover:text-yellow-700">
        <FontAwesomeIcon icon={faBookmark} className="h-5 w-5" />
      </a>
      <a href="#" title="Share on Twitter" onClick={shareOnTwitter} className="text-blue-400 hover:text-blue-600">
        <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
      </a>
      <a href="#" title="Share on Facebook" onClick={shareOnFacebook} className="text-blue-800 hover:text-blue-900">
        <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
      </a>
      <a href="#" title="Share on LinkedIn" onClick={shareOnLinkedIn} className="text-blue-700 hover:text-blue-800">
        <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
      </a>
      <a href="#" title="Copy Link" onClick={copyLink} className="text-green-500 hover:text-green-700">
        <FontAwesomeIcon icon={faShare} className="h-5 w-5" />
      </a>
      <ToastContainer />
    </div>
  );
};

export default NewsOptions;