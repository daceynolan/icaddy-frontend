import Logo from "../Logo";
import Container from "../Container";

import "./AuthLoader.scss";

export default function AuthLoader() {
  return (
    <Container>
      <div className="text-center py-5 auth_loader">
        <div className="position-relative d-inline-block mb-3">
          <i
            aria-hidden="true"
            className="fa fa-5x fa-spin fa-circle-o-notch"
          />
          <i
            aria-hidden="true"
            className="fa-2x fa fa-lock auth_loader__lock"
          />
        </div>
        <Logo />
      </div>
    </Container>
  );
}
