import { useState } from "react";
import DiscountsMenu from "./DiscountsMenu";

export default function DiscountsElement(props: {id:string, name: string, discountRate: number}) {
  const {id, name, discountRate} = props;
  const [isOpen, setIsOpen] = useState(false);

  function selectButtonClickHandler(): void {
    if(isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  }

  return (
    <>
    <div id={id}>
    <input type="checkbox" />
    <span>{name}</span>
    <span>{discountRate} %</span>
    <button type="button" 
      value={name} 
      onClick={selectButtonClickHandler}
    >메뉴 선택</button>
    </div>
    {/* {isOpen && <DiscountsMenu id={id} name={name}/>} */}
    <DiscountsMenu id={id} name={name}/>
    </>
  )
}