import travelKeywordState from "atoms/plannerAtoms/travelKeywordState";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const keywords = [
  {
    value: "cheap",
    label: "가성비 좋은 여행",
  },
  {
    value: "photo",
    label: "SNS에 올리기 좋은 명소",
  },
  {
    value: "natural",
    label: "자연과 즐길 수 있는 여행",
  },
  {
    value: "active",
    label: "다양한 액티비티를 즐길 수 있는 여행",
  },
  {
    value: "local",
    label: "지역 특색을 경험 할 수 있는 여행",
  },
  {
    value: "relaxing",
    label: "휴식을 취할 수 있는 힐링 여행",
  },
  {
    value: "local",
    label: "로컬 지식과 경험을 쌓을 수 있는 여행",
  },
];

const StyledPlanHeader = styled.h2`
  width: 100%;
  height: 100px;
  padding: 0 25px;
  background-color: #f8f9fb;
  font-size: 28px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

function PlanHeader() {
  const travelDescription = useRecoilValue(travelKeywordState);
  return <StyledPlanHeader>{`# ${travelDescription}`}</StyledPlanHeader>;
}

export default PlanHeader;
