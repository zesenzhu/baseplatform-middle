import React,{memo} from 'react';

import { Carousel } from 'antd';

function BottomFloor (props){

    const { slider,skin,slideChange } = props;

    return(

        <div className={"bottom_wrapper"}>

            {

                skin==='dark_blue'?

                    <Carousel effect="fade" autoplay={true} dots={false} afterChange={slideChange} easing={"easy-in-out"}>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide dark_blue_slide slider1"} >

                                <div className={"star-wrapper"}>

                                    <i className={"star1 star"}></i>

                                    <i className={"star2 star"}></i>

                                    <i className={"star3 star"}></i>

                                    <i className={"star4 star"}></i>

                                    <i className={"star5 star"}></i>

                                    <i className={"star6 star"}></i>

                                    <i className={"star7 star"}></i>

                                    <i className={"star8 star"}></i>

                                </div>

                            </div>

                        </div>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide dark_blue_slide slider2"}></div>

                        </div>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide dark_blue_slide slider3"}>

                                <div className={"point-wrapper"}>

                                    <i className={"point point1"}></i>

                                    <i className={"point point2"}></i>

                                    <i className={"point point3"}></i>

                                    <i className={"point point4"}></i>

                                    <i className={"point point5"}></i>

                                    <i className={"point point6"}></i>

                                </div>

                            </div>

                        </div>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide dark_blue_slide slider4"}>

                                <div className={"cuboid-wrapper"}>

                                    <i className={"cuboid cuboid1"}></i>

                                    <i className={"cuboid cuboid2"}></i>

                                    <i className={"cuboid cuboid3"}></i>

                                    <i className={"cuboid cuboid4"}></i>

                                    <i className={"cuboid cuboid5"}></i>

                                </div>

                            </div>

                        </div>

                    </Carousel>

                    :''

            }

            {

                skin==='dark_tech'?

                    <div className={"dark_tech_bg"}>

                        <div className={"star-wrapper"}>

                            <i className={"star1 star"}></i>

                            <i className={"star2 star"}></i>

                            <i className={"star3 star"}></i>

                            <i className={"star4 star"}></i>

                            <i className={"star5 star"}></i>

                            <i className={"star6 star"}></i>

                            <i className={"star7 star"}></i>

                            <i className={"star8 star"}></i>

                        </div>

                    </div>

                    :''

            }

            {

                skin==='cloud_schoolroom'?

                    <div className={"cloud_schoolroom_bg"}></div>

                    :''

            }

            {

                skin==='ai_school'?

                    <Carousel effect="fade" autoplay={true} dots={false} afterChange={slideChange} easing={"easy-in-out"}>


                        <div className={"swiper-slide dark_blue_slide slider1"} >

                            <div className={"star-wrapper"}>

                                <i className={"star1 star"}></i>

                                <i className={"star2 star"}></i>

                                <i className={"star3 star"}></i>

                                <i className={"star4 star"}></i>

                                <i className={"star5 star"}></i>

                                <i className={"star6 star"}></i>

                                <i className={"star7 star"}></i>

                                <i className={"star8 star"}></i>

                            </div>

                        </div>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide dark_blue_slide slider3"}>

                                <div className={"point-wrapper"}>

                                    <i className={"point point1"}></i>

                                    <i className={"point point2"}></i>

                                    <i className={"point point3"}></i>

                                    <i className={"point point4"}></i>

                                    <i className={"point point5"}></i>

                                    <i className={"point point6"}></i>

                                </div>

                            </div>

                        </div>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide dark_blue_slide slider4"}>

                                <div className={"cuboid-wrapper"}>

                                    <i className={"cuboid cuboid1"}></i>

                                    <i className={"cuboid cuboid2"}></i>

                                    <i className={"cuboid cuboid3"}></i>

                                    <i className={"cuboid cuboid4"}></i>

                                    <i className={"cuboid cuboid5"}></i>

                                </div>

                            </div>

                        </div>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide dark_blue_slide slider2"}></div>

                        </div>

                    </Carousel>

                    :''

            }


            {

                skin==='ai_exam'?

                    <Carousel effect="fade" autoplay={true} dots={false} afterChange={slideChange} easing={"easy-in-out"}>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide ai_exam_slide slider1"}>


                            </div>

                        </div>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide ai_exam_slide slider2"}>



                            </div>

                        </div>

                        <div className={"animate-wrapper"}>

                            <div className={"swiper-slide ai_exam_slide slider3"}></div>

                        </div>

                    </Carousel>

                    :''

            }

        </div>

    )

}

export default memo(BottomFloor);