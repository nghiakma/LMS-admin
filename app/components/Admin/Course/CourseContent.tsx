import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil, BsPlusCircle } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
  setVideo: (video: any) => void;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
  setVideo
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index] = {
      ...updatedData[index],
      links: updatedData[index].links.filter((_: any, i: number) => i !== linkIndex),
    };
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index] = {
      ...updatedData[index],
      links: [...updatedData[index].links, { title: "", url: "" }],
    };
    setCourseContentData(updatedData);
  };

  const handleRemoveQuizz = (index: number, quizzIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index] = {
      ...updatedData[index],
      iquizz: updatedData[index].iquizz.filter((_: any, i: number) => i !== quizzIndex),
    };
    setCourseContentData(updatedData);
  };
  
  const handleAddQuizz = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index] = {
      ...updatedData[index],
      iquizz: [...updatedData[index].iquizz, { question: "", options: ["", "", "", ""], correctAnswer: "" }],
    };
    setCourseContentData(updatedData);
  };
  

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === ""
    ) {
      toast.error("Vui lòng điền vào tất cả các trường trước!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
        iquizz: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Vui lòng điền vào tất cả các trường trước!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Phần không có tiêu đề ${activeSection}`,
        links: [{ title: "", url: "" }],
        iquizz: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("phần không được để trống!");
    } else {
      setActive(active + 1);
      handlleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
              key={index}
            >
              {showSectionInput && (
                <div className="flex w-full items-center">
                  <input
                    type="text"
                    className={`text-[20px] ${
                      item.videoSection === "Untitled Section"
                        ? "w-[170px]"
                        : "w-min"
                    } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index] = {
                        ...updatedData[index],
                        videoSection: e.target.value,
                      };
                      setCourseContentData(updatedData);
                    }}
                  />
                  <BsPencil className="cursor-pointer dark:text-white text-black" />
                </div>
              )}

              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] ? (
                  item.title ? (
                    <p className="font-Poppins dark:text-white text-black">
                      {index + 1}. {item.title}
                    </p>
                  ) : null
                ) : null}

                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className="dark:text-white text-black"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>

              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label className={styles.label}>Tiêu đề video</label>
                    <input
                      type="text"
                      placeholder="kế hoạch dự án..."
                      className={`${styles.input}`}
                      value={item.title}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index] = {
                          ...updatedData[index],
                          title: e.target.value,
                        };
                        console.log(index)
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className={styles.label}>video</label>
                    <input
                      type="file"
                      accept="video/*"
                      placeholder="sdder"
                      className={`${styles.input}`}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          // Tạo bản sao của mảng selectedVideos
                          const files = [...selectedVideos];
                          
                          // Thêm file mới vào vị trí tương ứng
                          files[index] = e.target.files[0];
                          
                          // Tạo bản sao của courseContentData
                          const updatedData = [...courseContentData];
                          
                          // Cập nhật videoUrl cho phần tử tại vị trí index
                          updatedData[index] = {
                            ...updatedData[index],
                            videoUrl: courseContentData[index]._id,
                          };

                          console.log(updatedData[index].videoUrl)
                    
                          // Log ra toàn bộ mảng files để kiểm tra
                          console.log('All selected videos:', files);
                          
                          // Cập nhật state
                          setCourseContentData(updatedData);
                          console.log("updated data:"+ updatedData)
                          setSelectedVideos(files);  // Thay vì setVideo
                          console.log(index)
                          console.log(files)
                          setVideo(files)
                        }  
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className={styles.label}>Độ dài video (phút)</label>
                    <input
                      type="number"
                      placeholder="20"
                      className={`${styles.input}`}
                      value={item.videoLength}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index] = {
                          ...updatedData[index],
                          videoLength: e.target.value,
                        };
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Mô tả video</label>
                    <textarea
                      rows={8}
                      cols={30}
                      placeholder="sdder"
                      className={`${styles.input} !h-min py-2`}
                      value={item.description}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index] = {
                          ...updatedData[index],
                          description: e.target.value,
                        };
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  {item?.links.map((link: any, linkIndex: number) => (
                    <div className="mb-3 block" key={linkIndex}>
                      <div className="w-full flex items-center justify-between">
                        <label className={styles.label}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${
                            linkIndex === 0
                              ? "cursor-no-drop"
                              : "cursor-pointer"
                          } text-black dark:text-white text-[20px]`}
                          onClick={() =>
                            linkIndex === 0
                              ? null
                              : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Mã nguồn... (Tiêu đề liên kết)"
                        className={`${styles.input}`}
                        value={link.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            links: updatedData[index].links.map((l: any, i: number) =>
                              i === linkIndex
                                ? { ...l, title: e.target.value }
                                : l
                            ),
                          };
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="url"
                        placeholder="Đường dẫn mã nguồn... (đường dẫn liên kết)"
                        className={`${styles.input} mt-6`}
                        value={link.url}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            links: updatedData[index].links.map((l: any, i: number) =>
                              i === linkIndex
                                ? { ...l, url: e.target.value }
                                : l
                            ),
                          };
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}
                  <div className="inline-block mb-4">
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" /> Thêm liên kết
                    </p>
                  </div>


                  {item?.iquizz.map((quizz: any, quizzIndex: number) => (
  <div className="mb-3 block" key={quizzIndex}>
    <div className="w-full flex items-center justify-between">
      <label className={styles.label}>
        Question {quizzIndex + 1}
      </label>
      <AiOutlineDelete
        className={`${
          quizzIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
        } text-black dark:text-white text-[20px]`}
        onClick={() => quizzIndex === 0 ? null : handleRemoveQuizz(index, quizzIndex)}
      />
    </div>
    <input
      type="text"
      placeholder="Câu hỏi..."
      className={`${styles.input}`}
      value={quizz.question}
      onChange={(e) => {
        const updatedData = [...courseContentData];
        updatedData[index] = {
          ...updatedData[index],
          iquizz: updatedData[index].iquizz.map((q: any, i: number) =>
            i === quizzIndex ? { ...q, question: e.target.value } : q
          ),
        };
        setCourseContentData(updatedData);
      }}
    />
    {quizz.options.map((option: string, optionIndex: number) => (
      <input
        key={optionIndex}
        type="text"
        placeholder={`Lựa chọn ${optionIndex + 1}...`}
        className={`${styles.input} mt-2`}
        value={option}
        onChange={(e) => {
          const updatedData = [...courseContentData];
          updatedData[index] = {
            ...updatedData[index],
            iquizz: updatedData[index].iquizz.map((q: any, i: number) => {
              if (i === quizzIndex) {
                const updatedOptions = [...q.options];
                updatedOptions[optionIndex] = e.target.value;
                return { ...q, options: updatedOptions };
              }
              return q;
            }),
          };
          setCourseContentData(updatedData);
        }}
      />
    ))}
    <input
      type="text"
      placeholder="Đáp án đúng..."
      className={`${styles.input} mt-6`}
      value={quizz.correctAnswer}
      onChange={(e) => {
        const updatedData = [...courseContentData];
        updatedData[index] = {
          ...updatedData[index],
          iquizz: updatedData[index].iquizz.map((q: any, i: number) =>
            i === quizzIndex ? { ...q, correctAnswer: e.target.value } : q
          ),
        };
        setCourseContentData(updatedData);
      }}
    />
  </div>
))}
<div className="inline-block mb-4">
  <p
    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
    onClick={() => handleAddQuizz(index)}
  >
    <BsLink45Deg className="mr-2" /> Thêm câu hỏi
  </p>
</div>

                </>
              )}

              {index === courseContentData.length - 1 && (
                <div>
                  <p
                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    onClick={() => newContentHandler(item)}
                  >
                    <AiOutlinePlusCircle className="mr-2" /> Thêm nội dung mới
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Thêm phần mới
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Trước
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Sau
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
