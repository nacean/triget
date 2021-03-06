import pickedAccommodationsState from "atoms/pickProductAtoms/pickedAccommodationsState";
import pickedFlightState from "atoms/pickProductAtoms/pickedFlightState";
import pickedAttractionsState from "atoms/pickProductAtoms/pickedAttractionsState";
import pickedRestaurantsState from "atoms/pickProductAtoms/pickedRestaurantsState";
import MapContainer from "components/travelMapPAgeComponent/mapComponent/MapContainer";
import PlanContainer from "components/travelMapPAgeComponent/planListComponent/PlanContainer";
import fetchTravelPlanList from "modules/fetchTravelPlanList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { productDataType } from "types/productDataType";
import { travelMovingTime } from "types/travelMovingTime";
import flightProductType from "types/flightTypes/flightProductType";

const StyledTravelMapPage = styled.article`
  width: 100%;
  display: flex;
  height: 900px;
  margin-top: 50px;
`;

function travelMapPage() {
  //현재 고른 product 정보
  const [nowPickStep, setNowPickStep] = useState<productDataType | null>(null);
  const [nowPickIndex, setNowPickIndex] = useState<number>(-1);

  const [pickedFlight, setPickedFlight] =
    useRecoilState<flightProductType | null>(pickedFlightState);
  const [pickedAccommodations, setPickedAccommodations] = useRecoilState<
    productDataType[]
  >(pickedAccommodationsState);
  const [pickedRestaurants, setPickedRestaurants] = useRecoilState<
    productDataType[]
  >(pickedRestaurantsState);
  const [pickedAttractions, setPickedAttractions] = useRecoilState<
    productDataType[]
  >(pickedAttractionsState);

  const { data, isSuccess, isLoading, isError, error } = useQuery(
    "travelList",
    fetchTravelPlanList,
  );

  useEffect(() => {
    window.scrollTo({ top: 2000, left: 0, behavior: "smooth" });
  });

  if (isSuccess) {
    const travelListArray = data as (productDataType | travelMovingTime)[];

    return (
      <StyledTravelMapPage>
        <MapContainer
          travelListArray={travelListArray}
          nowPickStep={nowPickStep}
          setNowPickStep={setNowPickStep}
          setNowPickIndex={setNowPickIndex}
        />
        <PlanContainer
          travelListArray={travelListArray}
          setNowPickStep={setNowPickStep}
          nowPickIndex={nowPickIndex}
          setNowPickIndex={setNowPickIndex}
        />
      </StyledTravelMapPage>
    );
  }
}

export default travelMapPage;
