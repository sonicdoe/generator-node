import test from 'ava'
import splitComma from './app/split-comma'

test(t => {
  t.deepEqual(splitComma('foo'), ['foo'])
  t.deepEqual(splitComma('foo, bar'), ['foo', 'bar'])
  t.deepEqual(splitComma('foo  ,  bar,baz'), ['foo', 'bar', 'baz'])
})
