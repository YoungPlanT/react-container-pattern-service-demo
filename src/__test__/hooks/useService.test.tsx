import {
  describe,
  it,
  expect,
} from "vitest";
import { renderHook } from '@testing-library/react';
import { useServiceData } from "../../features/services/hooks";


describe('useServiceData', () => {
  it('returns service data', () => {
    const { result } = renderHook(() => useServiceData());
    const services = result.current.getService();
    
    // console.log(services);

    expect(Array.isArray(services)).toBe(true);
  });
});