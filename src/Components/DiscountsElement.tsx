import { DiscountsRateProps } from "./DiscountsList"
import DiscountsMenu from "./DiscountsMenu";

export default function DiscountsElemen(props: DiscountsRateProps) {
  const {name, discount_rate} = props;

  return (
    <div>
    <input type="checkbox" />
    <span>{name}</span>
    <span>{discount_rate} %</span>
    <button type="button">메뉴 선택</button>
    <DiscountsMenu />
    </div>
  )
}