import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Friends() {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');

        if (!currentUser) {
            navigate('/login');
            return;
        }

        const friendsList = JSON.parse(localStorage.getItem(`friends_${currentUser}`)) || [];
        setFriends(friendsList);
    }, []);

  return (
    <main>
    <h2>Your Friends</h2>
        <div class="accordian" id="friendAccordian">
            <div class="accordian-item">
                <h2 class="accordian-header" id="headingOne">
                    <button class="accordian-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Friend 1
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#friendAccordian">
                    <div class="accordian-body">
                        <strong>Hobbies</strong>
                        <ul>
                            <li>Hobby</li>
                            <li>Hobby</li>
                            <li>Hobby</li>
                        </ul>
                        <button type="button" class="btn btn-secondary btn-sm">Chat</button>
                    </div>
                </div>
            </div>
            <div class="accordian-item">
                <h2 class="accordian-header" id="headingTwo">
                    <button class="accordian-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Friend 2
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#friendAccordian">
                <div class="accordian-body">
                    <strong>Hobbies</strong>
                    <ul>
                        <li>Hobby</li>
                        <li>Hobby</li>
                        <li>Hobby</li>
                    </ul>
                    <button type="button" class="btn btn-secondary btn-sm">Chat</button>
                    </div>
                </div>
            </div>
            <div class="accordian-item">
                <h2 class="accordian-header" id="headingThree">
                    <button class="accordian-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Friend 3
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#friendAccordian">
                <div class="accordian-body">
                    <strong>Hobbies</strong>
                    <ul>
                        <li>Hobby</li>
                        <li>Hobby</li>
                        <li>Hobby</li>
                    </ul>
                    <button type="button" class="btn btn-secondary btn-sm">Chat</button>
                    </div>
                </div>
            </div>
        </div>
      </main>
  );
}