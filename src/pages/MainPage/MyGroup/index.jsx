import GroupItem from './GroupItem';
// import './style.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { API } from '../../../utils/axios';
import { useEffect, useState } from 'react';

export default function MyGroup() {
  const [myGroups, setMyGroups] = useState([]);
  useEffect(() => {
    const getMyGroups = async () => {
      try {
        const res = await API.get('/group/studyGroups/users');
        console.log('내가 속한 그룹 ', res.data.study_groups);
        setMyGroups(res.data.study_groups);
      } catch (err) {
        console.error('에러!!!', err);
      }
    };

    getMyGroups();
  }, []);
  console.log('내그룹', myGroups);
  return (
    <section>
      <h2 className="font-bold text-2xl">내가 속한 그룹</h2>
      <div>
        <Swiper
          navigation={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          slidesPerView={3}
          spaceBetween={10}
          className="swiper_custom p-3 h-72"
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
        >
          {myGroups?.map((item, index) => {
            const { _id, is_private, group_name, group_category, group_image_path, group_description } = item;
            if (is_private) {
              //is_private이 true 면 보여주지않음
              return null;
            }
            // const roomId = rooms.find(room => room.group === _id)._id;
            return (
              <SwiperSlide key={index}>
                <GroupItem
                  key={_id}
                  // roomId={roomId}
                  group_id={_id}
                  imagePath={group_image_path}
                  subject={group_name}
                  category={group_category}
                  description={group_description}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
