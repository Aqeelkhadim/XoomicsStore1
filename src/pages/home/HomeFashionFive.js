import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutSix from "../../layouts/LayoutSix";
import TabProductSeven from "../../wrappers/product/TabProductSeven";
import HeroSliderThirteen from "../../wrappers/hero-slider/HeroSliderThirteen";

const HomeFashionFive = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutSix>
        {/* hero slider */}
        <HeroSliderThirteen />

        {/* tab product */}
        <TabProductSeven
          spaceBottomClass="pb-100"
          containerClass="container-fluid"
          extraClass="hm4-section-padding mt-5"
        />
      </LayoutSix>
    </Fragment>
  );
};

export default HomeFashionFive;
