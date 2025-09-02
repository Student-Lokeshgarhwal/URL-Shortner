// Redirectsite.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Redirectsite() {
  const { shortId } = useParams();
  const navigate    = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8001/url/${shortId}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const { redirectURL } = await res.json();
        window.location.href = redirectURL;
      } else if (res.status === 404) {
        navigate('/unauthorized');
      } else {
        console.error('Redirect error:', res.status);
      }
    })();
  }, [shortId, navigate]);

  return null; // or a “Loading…” spinner
}

export default Redirectsite;