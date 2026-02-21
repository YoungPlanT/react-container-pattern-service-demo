import {
  describe,
  it,
  // expect,
  vi
} from "vitest";
// import { renderHook } from '@testing-library/react';
import * as router from 'react-router-dom';


vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

describe("sctionMapper", () => {
  it("behavior check", () => {
    vi.mocked(router.useParams).mockReturnValue({ slug: 'bankruptcy' });

    // const { result } = renderHook(() => );

    // console.log(result);
  })
})