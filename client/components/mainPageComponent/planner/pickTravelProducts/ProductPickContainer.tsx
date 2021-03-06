import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Slide, Button, CircularProgress } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import { UseMutationResult } from "react-query";
import { useRecoilState } from "recoil";
import pickedFlightState from "atoms/pickProductAtoms/pickedFlightState";
import pickedAccommodationsState from "atoms/pickProductAtoms/pickedAccommodationsState";
import pickedRestaurantsState from "atoms/pickProductAtoms/pickedRestaurantsState";
import pickedAttractionsState from "atoms/pickProductAtoms/pickedAttractionsState";
import { productDataType } from "types/productDataType";
import flightProductType from "types/flightTypes/flightProductType";
import ProductMenu from "./ProductMenu";
import ProductPanel from "./ProductPanel";
import PickedProductsContainer from "./showPickedProducts/PickedProductsContainer";
import FlightPanel from "./flightComponents/FlightPanel";

interface ProductPickContainerType {
  slideMove: boolean;
  onSlideBtnClick: () => void;
  travelMutation: UseMutationResult;
}

interface journeyDataType {
  journey_id: number;
  flights_budget: number;
  accommodations_budget: number;
  restaurants_budget: number;
  attractions_budget: number;
  flights: [];
  accommodations: [];
  restaurants: [];
  attractions: [];
}

const StyledProductPickContainer = styled.div`
  position: relative;
  width: 80%;
  height: 800px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: ${props =>
    props.className === "cannot" ? "center" : "none"};
`;

const StyledProductListContainer = styled.section`
  position: relative;
  width: 100%;
  display: flex;
`;

const LoadingParagraph = styled.p`
  font-size: 20px;
  margin-top: 20px;
`;

function ProductPickContainer({
  slideMove,
  onSlideBtnClick,
  travelMutation,
}: ProductPickContainerType) {
  const router = useRouter();

  const { data, isLoading, isError, error, isSuccess } = travelMutation;

  const [menuNum, setMenuNum] = useState(0);
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

  const onBackBtnClick = () => {
    onSlideBtnClick();
    setPickedFlight(null);
    setPickedAccommodations([]);
    setPickedRestaurants([]);
    setPickedAttractions([]);
  };

  const onMakePlanBtnClick = () => {
    router.push("/travelMapPage");
  };

  if (isError)
    return (
      <Slide direction="left" in={slideMove} mountOnEnter unmountOnExit>
        <StyledProductPickContainer className="cannot">
          {`There is Error. Error name : ${error}`}
        </StyledProductPickContainer>
      </Slide>
    );

  if (isLoading)
    return (
      <Slide direction="left" in={slideMove} mountOnEnter unmountOnExit>
        <StyledProductPickContainer
          style={{ width: "100%" }}
          className="cannot"
        >
          <CircularProgress size={100} sx={{ color: "#606060" }} />
          <LoadingParagraph>
            ?????? ????????? ???????????? ????????????. ????????? ??????????????????.
          </LoadingParagraph>
        </StyledProductPickContainer>
      </Slide>
    );

  if (isSuccess) {
    const { flights, accommodations, restaurants, attractions } =
      data as journeyDataType;

    return (
      <Slide direction="left" in={slideMove} mountOnEnter unmountOnExit>
        <StyledProductListContainer>
          <StyledProductPickContainer>
            <ProductMenu menuNum={menuNum} setMenuNum={setMenuNum} />
            <FlightPanel
              value={menuNum}
              index={0}
              productArray={flights}
              pickedFlight={pickedFlight}
              setPickedFlight={setPickedFlight}
            />
            <ProductPanel
              value={menuNum}
              index={1}
              productArray={accommodations}
              pickedProducts={pickedAccommodations}
              setPickedProducts={setPickedAccommodations}
            />
            <ProductPanel
              value={menuNum}
              index={2}
              productArray={restaurants}
              pickedProducts={pickedRestaurants}
              setPickedProducts={setPickedRestaurants}
            />
            <ProductPanel
              value={menuNum}
              index={3}
              productArray={attractions}
              pickedProducts={pickedAttractions}
              setPickedProducts={setPickedAttractions}
            />
            <Button
              variant="contained"
              startIcon={<ChevronLeftIcon />}
              size="large"
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                backgroundColor: "#424242",
                borderRadius: "12px",
                ":hover": {
                  backgroundColor: "#616161",
                },
              }}
              onClick={onBackBtnClick}
            >
              ????????????
            </Button>
          </StyledProductPickContainer>
          <PickedProductsContainer />
          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            size="large"
            color="info"
            sx={{
              position: "absolute",
              bottom: 20,
              right: 10,
              borderRadius: "12px",
            }}
            onClick={onMakePlanBtnClick}
          >
            ????????? ??????
          </Button>
        </StyledProductListContainer>
      </Slide>
    );
  }
}

export default ProductPickContainer;
