import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import './ActivitiesList.css';

function ActivitiesList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/rest/activities');
        setActivities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/rest/activities/${id}`);
      setActivities(activities.filter(activity => activity._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="activityList-title">Activities List</h1>
      <div className="activity-cards">
        {activities.map((activity) => (
          <div className="activity-card" key={activity._id}>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
            <p>{activity.type}</p>
            <p>{activity.content}</p>
            <div className="icons-container">
              <Link to={`/activities/edit/${activity._id}`} className="pencil-link">
                <FontAwesomeIcon icon={faPencilAlt} />
              </Link>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="delete-icon"
                onClick={() => handleDelete(activity._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivitiesList;
