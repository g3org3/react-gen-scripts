
import * as db from '../db.js';

describe('Utils / db', () => {
  it('Set a simple string given a key', () => {
    const value = db.set('mykey', 'hello-test');
    expect(value).toBe('"hello-test"');
  })

  it('Get a value given a key', () => {
    const value = db.get('mykey');
    expect(value).toBe('hello-test');
  })

  it('Set a json object given a key', () => {
    const value = db.set('my-json-obj', { name: 'test' });
    expect(value).toBe('{"name":"test"}');
  })
  
  it('Set an array given a key', () => {
    const value = db.set('my-array', [1, 2]);
    expect(value).toBe('[1,2]');
  })
})