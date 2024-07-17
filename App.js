import './App.css';
import React, { useState, useEffect } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';

function App() {
  const [allPassword, setPwd] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const handleArrPwd = () => {
    let newPwdItem = {
      Url: newUrl,
      Username: newUsername,
      Password: newPassword
    }

    let updatesPwdArr = [...allPassword];
    updatesPwdArr.push(newPwdItem);
    setPwd(updatesPwdArr);
    localStorage.setItem('pwdlist', JSON.stringify(updatesPwdArr));
    setNewUrl("");
    setNewUsername("");
    setNewPassword("");
  };

  const handleDeletePwd = (index) => {
    let reducedPwd = [...allPassword];
    reducedPwd.splice(index, 1); // remove 1 element at the index
    localStorage.setItem('pwdlist', JSON.stringify(reducedPwd));
    setPwd(reducedPwd);
  }

  useEffect(() => {
    let savedPwd = JSON.parse(localStorage.getItem('pwdlist'));
    if (savedPwd) {
      setPwd(savedPwd);
    }
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  const toggleShowPasswords = () => {
    setShowPasswords(!showPasswords);
  }

  const clearInput = (setter) => {
    setter("");
  }

  return (
    <div className="App">
      <h1>Password Managing</h1>

      <h3>Add New Password</h3>
      <div className="pwd-list">
        <div className='pwd-input'>
          <div className='pwd-input-item'>
            <label>Url</label>
            <div className='input-container'>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Enter Website"
              />
              {newUrl && <MdClear className="clear-icon" onClick={() => clearInput(setNewUrl)} />}
            </div>
          </div>
          <div className='pwd-input-item'>
            <label>Username</label>
            <div className='input-container'>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter Username"
              />
              {newUsername && <MdClear className="clear-icon" onClick={() => clearInput(setNewUsername)} />}
            </div>
          </div>
          <div className='pwd-input-item'>
            <label>Password</label>
            <div className='input-container'>
              <input
                type={visible ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Password"
              />
              {newPassword && <MdClear className="clear-icon" onClick={() => clearInput(setNewPassword)} />}
              <div className='p-2' onClick={toggleVisibility}>
                {visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div className='pwd-input-item'>
            <button
              type="button"
              onClick={handleArrPwd}
              className="primarybtn"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className='pwd-area'>
        <h2 className="password-text">Your Passwords</h2>
        <div className='pwd-area'>
          <div className="check-card">
            <input
              type="checkbox"
              id="check"
              className="check-box"
              onChange={toggleShowPasswords}
            />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          <div className="pwd-list">
            {allPassword.map((pwd, index) => (
              <div className="pwd-list-item" key={index}>
                <h2>{`Password ${index + 1}`}</h2>
                <p>{`Url: ${pwd.Url}`}</p>
                <p>{`Username: ${pwd.Username}`}</p>
                <p>{`Password: ${showPasswords ? pwd.Password : '********'}`}</p>
                <MdDeleteOutline className="icon" onClick={() => handleDeletePwd(index)} title="Delete?" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
