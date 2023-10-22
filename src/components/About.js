import React from "react";

const About = () => {
  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center">About iNotebook</h1>
      <p className="lead text-center">Where Inspiration Meets Organization</p>

      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Our Mission</h2>
          <p>
            At iNotebook, we're on a mission to redefine note-taking and make
            it an enriching experience. We believe that notes aren't just words
            on a page; they are windows to your creativity, memory, and
            aspirations. Our goal is to provide you with the perfect canvas to
            express yourself, organize your thoughts, and unlock your full
            potential.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://downloadr2.apkmirror.com/wp-content/uploads/2020/07/24/5f040590b070d.png"
            alt="iNotebook"
            className="img-fluid rounded-circle"
          />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="mb-4">The Art of Note-Taking</h2>
        <p>
          We understand that taking notes is both an art and a science. Whether
          it's capturing lecture highlights, sketching your thoughts, or
          managing tasks, iNotebook is designed to cater to your every need.
          With an intuitive and user-friendly interface, you can seamlessly
          transform your ideas into digital realities.
        </p>
      </div>
    </div>
  );
};

export default About;
