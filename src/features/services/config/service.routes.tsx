import type { RouteObject } from "react-router-dom";
import { HeaderSectionComponent } from "../components/sections";

import type { HeaderSection } from "../schemas/service.schema";

const placeholderData: HeaderSection = {
  type: "header_section",
  title_emphasized_part: "fjdnsf",
  title_base_part: "fdsfsd",
  sub_title: "vfdfsvd"
};

const serviceRoutes: RouteObject[] = [
  {
    path: "/services/:slug",
    element: <HeaderSectionComponent data={placeholderData} />
  }
];

export default serviceRoutes;