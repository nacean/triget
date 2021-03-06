import PlanningBox from "components/mainPageComponent/planner/PlanningBox";
import styled from "styled-components";

const MainAsk = styled.h1`
  width: 100%;
  padding: 40px 0;
  font-size: 24px;
  font-weight: 500;
`;

function MainPage() {
  return (
    <article>
      <MainAsk>어떤 여행을 하고 싶으신가요?</MainAsk>
      <PlanningBox />
    </article>
  );
}

export default MainPage;
