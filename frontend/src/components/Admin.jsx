import React, { useEffect, useState } from 'react'

function Admin() {
    const [allUrls, setAllUrls] = useState([])
      const [allUsers, setAllUsers] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8001/admin/urls',{
      method:"GET",
      credentials: "include"
    })
    .then((res)=>{
      if(res.status == 403) {
        window.location.href = '/unauthorized'
        return 
      }
      if(res.status == 500){
        alert("Failed to fetch informations!")
        return
      }
        return res.json();
    })
    .then((data)=>{
        console.log(data)
        setAllUrls(data.allurls)
        setAllUsers(data.allusers)
    })
    .catch((err)=>{
      console.error('Error fetching admin URLs:', err)
    })
    },[])
  return (
    <>
     <ul>
       <h2>All Urls</h2>
        {allUrls.map((url) => (
          <li key={url._id}>
            <b>ShortURL</b>: {url.shortId} -- <b>Redirected to</b> -- {url.redirectURL}
          </li>
        ))}
      </ul>
      <ul>
        <h2>All Users</h2>

        {allUsers.map((user) => (
          <li key={user._id}>
             <b>{user.name}</b> → {user.email}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Admin