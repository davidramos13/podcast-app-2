/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import nodeFetch from 'node-fetch';

// @ts-ignore
global.fetch = nodeFetch;
// @ts-ignore
global.Request = nodeFetch.Request;
