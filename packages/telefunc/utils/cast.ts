export { cast }

function cast<T>(_: unknown): asserts _ is T {}
