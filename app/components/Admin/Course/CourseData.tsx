import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {

  const handleBenefitChange = (index: number, value: string) => {
    // Sao chép sâu đối tượng để không thay đổi đối tượng gốc
    const updatedBenefits = benefits.map((benefit, i) =>
      i === index ? { ...benefit, title: value } : benefit
    );
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: string) => {
    // Sao chép sâu đối tượng để không thay đổi đối tượng gốc
    const updatedPrerequisites = prerequisites.map((prerequisite, i) =>
      i === index ? { ...prerequisite, title: value } : prerequisite
    );
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
      setActive(active + 1);
    } else {
      toast.error("Vui lòng điền vào các trường để chuyển sang phần tiếp theo!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          Lợi ích của học viên khi tham gia khóa học này là gì?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="Bạn sẽ xây dựng một nền tảng đầy đủ"
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          Điều kiện tiên quyết để bắt đầu khóa học này là gì?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="Bạn cần có kiến ​​thức cơ bản về lập trình"
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
