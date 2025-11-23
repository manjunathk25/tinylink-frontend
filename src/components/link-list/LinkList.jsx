import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLinks, deleteLinkByCode } from '../../api';
import deleteIcon from '../../assets/delete.svg';
import visitLinkIcon from '../../assets/visit-link.svg';
import viewStatsIcon from '../../assets/view-stats.svg';
import { toast } from 'react-toastify';
import './link-list.css';

const LinkList = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async (code) => {
    try {
      const response = await deleteLinkByCode(code);
      if(response.status === 204){
        toast.success('Link deleted successfully!');
      }
      setLinks(links.filter(link => link.code !== code));
    } catch (error) {
      toast.error('Failed to delete link. Please try again.');
      console.error('Error deleting link:', error);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await getAllLinks();
      setLinks(response.data);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );

  return (
    <div className="table-wrapper">
      <table className="links-table">
        <thead>
          <tr>
            <th>Short Code</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Last Clicked</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map(link => (
            <tr key={link.id}>
              <td>{link.code}</td>
              <td className="url-cell" title={link.url}>{link.url}</td>
              <td>{link.clicks}</td>
              <td>{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "Not Yet Clicked"}</td>
              <td className="actions-cell">
                <button onClick={() => handleDelete(link.code)} title="Delete">
                  <img src={deleteIcon} alt="Delete" />
                </button>

                <button onClick={() => navigate(`/stats/${link.code}`)} title="View Stats">
                  <img src={viewStatsIcon} alt="View Stats" />
                </button>

                <button
                  onClick={
                    () => {
                      fetchLinks();
                      window.open(`https://tnylnk.up.railway.app/${link.code}`, '_blank')
                    }
                  }
                  title="Visit Link"
                >
                  <img src={visitLinkIcon} alt="Visit Link" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkList;
