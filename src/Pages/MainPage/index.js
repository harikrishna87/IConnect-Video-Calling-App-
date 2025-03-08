import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useProfileLogic = () => {
  const [weekday, setWeekday] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const date = new Date();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [accountCreatedDate, setAccountCreatedDate] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');
  const [form] = Form.useForm();
  const auth = getAuth();

  const [profileData, setProfileData] = useState({
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    mobile: "9876543210",
    dob: "02 / 12 / 2000",
  });
  
  useEffect(() => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentWeekday = daysOfWeek[date.getDay()];
    setWeekday(currentWeekday);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const loadAvatarFromLocalStorage = (identifier) => {
    const savedAvatar = localStorage.getItem(`avatar_${identifier}`);
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
      return true;
    }
    return false;
  };

  const loadProfileDataFromLocalStorage = (identifier) => {
    const savedProfileData = localStorage.getItem(`profileData_${identifier}`);
    if (savedProfileData) {
      const parsedData = JSON.parse(savedProfileData);
      setProfileData(parsedData);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.metadata && currentUser.metadata.creationTime) {
        const creationDate = new Date(currentUser.metadata.creationTime);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedCreationDate = creationDate.toLocaleDateString('en-US', options);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const creationWeekday = daysOfWeek[creationDate.getDay()];
        setAccountCreatedDate(`${creationWeekday} - ${formattedCreationDate}`);
      } else {
        setAccountCreatedDate(`${weekday} - ${currentDate}`);
      }
      
      if (currentUser && currentUser.isAnonymous) {
        const identifier = currentUser.uid;
        setUserIdentifier(identifier);
        
        setUser({
          displayName: "Guest",
          email: "GuestUser@gmail.com",
          isAnonymous: true,
          uid: currentUser.uid
        });
        
        const anonymousProfileData = {
          linkedin: "www.linkedin.com/in/126a29268",
          github: "https://github.com/harikrishna87",
          mobile: "9988118800",
          dob: "12/02/2002",
        };
        
        const hasStoredData = loadProfileDataFromLocalStorage(identifier);
        if (!hasStoredData) {
          setProfileData(anonymousProfileData);
          localStorage.setItem(`profileData_${identifier}`, JSON.stringify(anonymousProfileData));
        }

        const hasStoredAvatar = loadAvatarFromLocalStorage(identifier);
        if (!hasStoredAvatar) {
          setAvatarUrl('/guest-avatar.png');
        }
      } 
      else if (currentUser) {
        const identifier = currentUser.email;
        setUserIdentifier(identifier);
        setUser(currentUser);
        loadProfileDataFromLocalStorage(identifier);
        const hasStoredAvatar = loadAvatarFromLocalStorage(identifier);
        if (!hasStoredAvatar) {
          if (currentUser.photoURL) {
            setAvatarUrl(currentUser.photoURL);
          } else {
            setAvatarUrl('/user-avatar.png');
          }
        }
      } 
      else {
        setUser({
          displayName: "Guest User",
          email: "GuestUser123@gmail.com"
        });
        setAvatarUrl('/guest-avatar.png');
        setUserIdentifier('guest');
      }
    });

    return () => unsubscribe();
  }, [auth, weekday, currentDate]);
  
  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(profileData);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleSave = () => {
    form.validateFields().then(values => {
      setProfileData(values);
      if (userIdentifier) {
        localStorage.setItem(`profileData_${userIdentifier}`, JSON.stringify(values));
      }
      
      setIsEditing(false);
    });
  };
  
  const handleImageUpload = (info) => {
  };
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setAvatarUrl(result);
      if (userIdentifier) {
        localStorage.setItem(`avatar_${userIdentifier}`, result);
      }
    };
    reader.readAsDataURL(file);
    return false;
  };

  return {
    weekday,
    currentDate,
    user,
    loading,
    isEditing,
    avatarUrl,
    accountCreatedDate,
    profileData,
    form,
    handleEdit,
    handleCancel,
    handleSave,
    handleImageUpload,
    beforeUpload
  };
};