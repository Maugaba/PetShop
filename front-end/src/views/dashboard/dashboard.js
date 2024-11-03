import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperStyles = {
  '.swiper-button-next::after, .swiper-button-prev::after': {
    color: '#F7EEE4',
    fontSize: '24px',
    fontWeight: 'bold'
  }
};

export default function Dashboard() {
  return (
    <section id="banner" style={{ background: '#F9F3EC' }}>
      <div className="container">
        <Swiper
            className="main-swiper"
            style={swiperStyles}
            pagination={{
              clickable: true,
              el: '.swiper-pagination.mb-5',
              bulletClass: 'swiper-pagination-bullet mb-5'
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Pagination, Navigation]}
        >
          <SwiperSlide className="swiper-slide py-5">
            <div className="row banner-content align-items-center">
              <div className="img-wrapper col-md-5">
                <img src="images/banner-img.png" className="img-fluid" alt="Banner" />
              </div>
              <div className="content-wrapper col-md-7 p-5 mb-5">
                <div className="secondary-font text-primary text-uppercase mb-4">Obten las mejores ofertas</div>
                <h2 className="banner-title display-1 fw-normal">
                  Porque ellos <span className="text-primary">merecen lo mejor</span>
                </h2>
                <a href="/products/list" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                  Comprar ahora
                  <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </a>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="swiper-slide py-5">
            <div className="row banner-content align-items-center">
              <div className="img-wrapper col-md-5">
                <img src="images//banner-img3.png" className="img-fluid" alt="Banner" />
              </div>
              <div className="content-wrapper col-md-7 p-5 mb-5">
                <div className="secondary-font text-primary text-uppercase mb-4">¿Tienes dudas sobre nosotros?</div>
                <h2 className="banner-title display-1 fw-normal">
                Conoce por qué nos<span className="text-primary"> importa darte lo mejor</span>
                </h2>
                <a href="/about" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                  Sobre nosotros
                  <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </a>
              </div>
            </div>
          </SwiperSlide>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination mb-5"></div>
        </Swiper>
      </div>
    </section>
  );
}
