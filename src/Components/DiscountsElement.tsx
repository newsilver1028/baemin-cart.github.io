import { DiscountsRateProps } from "./DiscountsList"
import DiscountsMenu from "./DiscountsMenu";

export default function DiscountsElement(props: DiscountsRateProps) {
  const {id, name, discountRate} = props;

  return (
    <>
    <div id={id}>
    <input type="checkbox" />
    <span>{name}</span>
    <span>{discountRate} %</span>
    <button type="button">메뉴 선택</button>
    </div>
    <DiscountsMenu name={name}/>
    </>
  )
}