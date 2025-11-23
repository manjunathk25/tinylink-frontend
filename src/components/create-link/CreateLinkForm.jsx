import { createShortLink } from '../../api.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import tinyLinkIllustration from '../../assets/tinylink-illustration.png';
import './create-link-form.css';

const CreateLinkForm = () => {

  const [url, setUrl] = useState('');
  const [creating, setCreating] = useState(false);
  const [customCode, setCustomCode] = useState('');

  const urlRegex = /^(https?:\/\/)((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|(\d{1,3}(\.\d{1,3}){3}))(:\d{2,5})?(\/[^\s]*)?$/;

  function isValidUrl(url) {
    return urlRegex.test(url.trim());
  }

  const codeRegex = /^[A-Za-z0-9]{6}$/;

  function isValidCustomCode(code) {
    if (code === "") return true;
    return codeRegex.test(code);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    if (!isValidUrl(url)) {
      toast.error('Please enter a valid URL.');
      return;
    }
    if (!isValidCustomCode(customCode)) {
      toast.warn('Custom code must be exactly 6 alphanumeric characters.');
      return;
    }

    try{
      const response = await createShortLink({ url, customCode });
      console.log('Short link created:', response.data);
      if(response.status === 201){
        toast.success('Short link created successfully!');
      }
      setUrl('');
      setCustomCode('');
    }
    catch (error) {
      toast.error('Failed to create short link. Please try again.');
      console.error('Error creating short link:', error);
    }
    setCreating(false);
  }

  return (
    <div  className='create-link-flex'>
      <form className="create-link-form" onSubmit={handleSubmit}>
        <p>Create your tiny-links in seconds</p>
        <input type="text"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <input type="text"
          placeholder="Custom short code (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />

        <button type="submit" disabled={creating || !url.trim()}>
          {creating ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>

      <img className="illustration-img" src={tinyLinkIllustration} alt="TinyLink Illustration" />
    </div>
  )
}

export default CreateLinkForm