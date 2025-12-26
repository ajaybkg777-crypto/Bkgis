import React, { useEffect, useState } from 'react';
import api from '../api';

export default function DailyUpdates(){
  const [items, setItems] = useState([]);
  useEffect(()=>{
    api.get('/announcements')
      .then(r => setItems(r.data || []))
      .catch(console.error);
  }, []);
  return (
    <div className="container" style={{ padding: 16 }}>
      <h2>Daily Updates</h2>
      {items.map(it => {
        const attachments = Array.isArray(it.attachments)
          ? it.attachments
          : it.attachments
            ? [it.attachments]
            : [];
        const created = it.createdAt || it.date || it.updatedAt;
        const base = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace('/api','');
        return (
          <div key={it._id} className="update-card" style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <h4>{it.title}</h4>
            <p dangerouslySetInnerHTML={{__html: it.body}} />
            {attachments.length > 0 && attachments.map((a,i)=>(
              <img key={i} src={base + a} alt="attachment" style={{maxWidth:200, marginRight:8}} />
            ))}
            <small>{created ? new Date(created).toLocaleString() : ''}</small>
          </div>
        );
      })}
    </div>
  );
}