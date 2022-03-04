import PropTypes from "prop-types";
// material
import { Box, Card, Typography, Stack, ButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
//
import LoanFormView from "src/pages/LoanForm";
import { useState } from "react";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, cover, roi } = product;
  const [formOpen, setFormOpen] = useState(false);
  return (
    <>
      {formOpen && (
        <LoanFormView
          onClose={() => {
            setFormOpen(false);
          }}
        />
      )}

      <Card>
        <Box sx={{ pt: "100%", position: "relative" }}>
          <ProductImgStyle alt={name} src={cover} />
        </Box>
        <ButtonBase
          onClick={() => {
            setFormOpen(true);
          }}
        >
          <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1">
                &nbsp;
                {"12% RoI"}
              </Typography>
            </Stack>
          </Stack>
        </ButtonBase>
      </Card>
    </>
  );
}
