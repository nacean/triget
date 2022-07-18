import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import Image from "next/image";
import styled from "styled-components";

interface ProductDataType {
  product_id: number;
  product_name: string;
  thumbnail_url: string;
  product_type: string;
  city: string;
  district: string;
  address: string;
  longitude: number;
  latitude: number;
  price: number;
  currency_code: string;
  review_score: number;
  popularity: number;
  product_detail_url: string;
  keywords_array: string[];
}

interface ProductPanelType {
  value: number;
  index: number;
  productArray: ProductDataType[];
}

const StyledPanel = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

function ProductPanel({ value, index, productArray }: ProductPanelType) {
  return (
    <StyledPanel
      role="tabpanel"
      hidden={value !== index}
      id={`productPanel-${index}`}
      aria-labelledby={`productMenu-${index}`}
    >
      {value === index && (
        <List>
          {productArray.map((product: ProductDataType) => (
            <Paper square sx={{ marginBottom: "10px" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <Image src={product.thumbnail_url} width={200} height={200} />
                  <ListItemText />
                </ListItemButton>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </StyledPanel>
  );
}

export default ProductPanel;
