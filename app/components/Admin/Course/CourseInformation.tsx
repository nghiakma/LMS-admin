import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
  setImage: (image: any) => void;
  setDemo: (demo: any) => void;
  setDemoPreviewUrl: (demopreviewUrl: any) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
  setImage,
  setDemo,
  setDemoPreviewUrl
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      console.log(file)
      // Tạo preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Tạo preview URL cho file được kéo thả
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };


  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Tên khóa học</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="name"
            className={`
            ${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Mô tả khóa học</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Viết điều gì đó tuyệt vời..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Giá khóa học</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
               Giá ước tính (tùy chọn)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="price"
              placeholder="79"
              className={`
            ${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="email">
            Thẻ khóa học
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
             Danh mục khóa học
            </label>
            <select
              name=""
              id=""
              className={`${styles.input}`}
              value={courseInfo.category}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Chọn danh mục</option>
              {categories &&
                categories.map((item: any) => (
                  <option value={item.title} key={item._id}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Cấp độ khóa học</label>
            <input
              type="text"
              name=""
              value={courseInfo.level}
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Sơ cấp/Trung cấp/Chuyên gia"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo</label>
            <input
                      type="file"
                      accept="video/*"
                      placeholder="sdder"
                      className={`${styles.input}`}
                      onChange={(e) => { 
                        const file = e.target.files?.[0];
                        if (file) {
                        setDemo(file);
                        console.log(file)
                        // Tạo preview URL
                       const objectUrl = URL.createObjectURL(file);
                       setDemoPreviewUrl(objectUrl);
                       }
                      }}
                    />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-full w-full object-cover"
              />
            ):
            courseInfo.thumbnail ? (
              <img
                src={`http://localhost:8000/images/${courseInfo.thumbnail}`}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
               Kéo và thả hình thu nhỏ của bạn vào đây hoặc nhấp để duyệt
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
