import React, { useEffect, useState } from 'react'

function Home() {
  const [urls, setUrls] = useState([])
  const [generateUrl, setGenerateUrl] = useState('')
  const [newShortURL, setNewShortURL] = useState('')
  const [createdURL, setCreatedURL] = useState('')

  useEffect(() => {
    fetch('http://localhost:8001/', {
      method: 'GET',
      credentials: 'include', // important for cookies
    })
      .then((res) => {
        console.log(res)
        if (res.status === 401) {
          window.location.href = '/login'
          return false
        }
        return res.json()
      })
      .then((data) => {
        setUrls(data.urls)
      })
      .catch((err) => {
        console.error('Error fetching URLs:', err)
      })
  }, [])

 const handlegenerateUrl = (e) => {
  e.preventDefault();
  fetch('http://localhost:8001/url', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: generateUrl  
    })
  })
    .then((res) => {
      console.log(res);
      if (res.status === 401) {
        window.location.href = '/login';
        return false;
      }
      return res.json();
    })
    .then((data) => {
      console.log(data.shortUrl);
      setNewShortURL(data.shortUrl)
    })
    .catch((err) => {
      console.error('Error posting URL:', err);
    });
};

const handlerediretedUrl = async () => {
    // 1. Fetch the JSON from Express
    const res = await fetch(
      `http://localhost:8001/url/${newShortURL}`, 
      { credentials: 'include' }
    );

    // 2. If you get valid JSON, pull out redirectURL
    if (res.ok) {
      const { redirectURL } = await res.json();
      // 3. Navigate the browser to it
      window.location.href = redirectURL;
    } else {
      console.error('Error fetching redirect:', res.status);
    }
  };

  const handlecreatedUrl = async(shortID)=>{

    const res = await fetch(
      `http://localhost:8001/url/${shortID}`, 
      { credentials: 'include' }
    );
    if (res.ok) {
      const { redirectURL } = await res.json();
      console.log(redirectURL)
      window.location.href = redirectURL;
    } else {
      console.error('Error fetching redirect:', res.status);
    }

    return;
  }




const handlesetAllUrls = () => {
  console.log('click')
  window.location.href = '/admin/url'
  return;
}

return (
  <>
    <button onClick={() => handlesetAllUrls()}>Admin panel</button>
    <h1>Home Page</h1>
    <p><b>New Short URL</b>: <span style={{color: 'blue'}} onClick={handlerediretedUrl}> {newShortURL}</span> </p>
    <form onSubmit={handlegenerateUrl}>
      <label>Original URL</label>
      <input type="text" value={generateUrl} placeholder='Original URL' onChange={(e) => setGenerateUrl(e.target.value)} />
      <button type='submit'>Generate</button>
    </form>
    <ul>
      {urls.map((url) => (
        <li key={url._id}>
           <big>ShortUrl : </big> <a style={{color:'blue',textDecoration:'underline',cursor:'pointer'}} 
           onClick={(e)=>{e.preventDefault(),handlecreatedUrl(url.shortId)}}>{url.shortId}</a>  -- <big>Redirected to</big> -- {url.redirectURL}

        </li>

      ))}
    </ul>

  </>
)

}
export default Home
