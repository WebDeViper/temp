import { Link } from 'react-router-dom';
import { API } from '../../../utils/axios';

import { useEffect, useState } from 'react';

export default function GroupItem({ group_id, subject, imagePath, category, description }) {
  console.log(description);
  const [roomId, setRoomId] = useState(null);
  // const editedDescription = description && description?.length > 15 ? description?.slice(0, 14).join('') : description;
  // console.log(editedDescription, '뭔데이거');
  const maxLength = 20; // 원하는 최대 길이
  const truncatedDescription =
    description && description.length > maxLength
      ? description.slice(0, maxLength) + '...' // 긴 경우 잘라내고 '...'을 추가
      : description; // 길이가 작은 경우 그대로 둡니다
  useEffect(() => {
    const handleRooms = async () => {
      try {
        const res = await API.get('/group/rooms');
        console.log('요청', res.data);
        const foundRoom = res.data.find(room => room._id === group_id);
        if (foundRoom) {
          setRoomId(foundRoom._id); // 찾은 roomId를 설정
        }
      } catch (err) {
        console.error('에러!!!', err);
      }
    };

    handleRooms();
  }, [group_id]);

  return (
    <Link to={`/group/${group_id}`}>
      <div className="rounded-[4px] shadow-xl px-9 pb-5 pt-[25px] h-full">
        <div className="flex items-center flex-col">
          <img
            className="rounded-full w-16 h-16"
            src={`${import.meta.env.VITE_APP_BACK_URL}${imagePath}`}
            alt="귀여운 우유"
          />
          <div className="mt-4 h-24 flex flex-col">
            <h3 className="font-bold text-center">{subject}</h3>
            <p className="text-start" style={{ overflowWrap: 'anywhere' }}>
              {truncatedDescription}
            </p>
          </div>
          <div className="mt-2.5">
            <span className="block bg-indigo-100 text-indigo-800 text-md font-bold mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
