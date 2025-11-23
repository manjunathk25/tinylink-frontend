import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getLinkStats } from "../../api"
import badRequest from "../../assets/bad-request.avif"
import "./view-stats.css"

const ViewStats = () => {

  const {code} = useParams();
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState(null);

  const fetchStats = async () => {
      try {
        const response = await getLinkStats(code);
        setLink(response.data);
        setLoading(false);
        console.log('Link stats:', response.data);
      }
      catch (error) {
        setLoading(false);
        console.error('Error fetching link stats:', error);
      }
    }
  
  useEffect(() => {
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if(!link){
    return (
      <div className="error-container">
        <img src={badRequest} alt="Bad Request" className="error-image" />
        <h2 className="error-message">Invalid Link Code or Link Not Found</h2>
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div className="stats-container">

      <button className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </button>

      <h1>Link Statistics</h1>

      <div className="stats-card">
        <ul>
          <li><strong>ID:</strong> {link.id}</li>
          <li><strong>Short Code:</strong> {link.code}</li>
          <li><strong>Original URL:</strong><span className="long-url" title={link.url}>{link.url}</span></li>
          <li><strong>Total Clicks:</strong> {link.clicks}</li>
          <li><strong>Last Clicked:</strong> {new Date(link.lastClicked).toLocaleString() || "Not clicked yet"}</li>
          <li><strong>Created At:</strong> {new Date(link.createdAt).toLocaleString()}</li>
          <li>
            <strong>Short Link:</strong>
            <a
              href={`https://tnylnk.up.railway.app/${link.code}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fetchStats()}
            >
              https://tnylnk.up.railway.app/{link.code}
            </a>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default ViewStats
