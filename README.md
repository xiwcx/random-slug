# Random Slugs

There are some cases where it is convenient to have a human readable slug
instead of [some](https://en.wikipedia.org/wiki/Universally_unique_identifier)
[kind](https://github.com/ulid/spec) of unreadable id. The most annoying part is
probably compiling that list of words, so here it is done for you.

## Usage

Default usage will get you a three-word slug, separated by hyphens:

```js
const slug = generateRandomSlug();
// 'permission-zodiac-guitar'
```

### generateRandomSlug(generateSlugArguments)

#### generateSlugArguments _(optional)_

- `separator` _(optional)_: the string that will separate each word in the slug
  - **type**: `string`
  - **default**: `-`
- `wordList` _(optional_): this allows you to override the default list with
  your own custom list
  - **type**: `string[]`
  - **default**: (view source)
- `wordQuantity` _(optional_): this allows you to generate slugs of different
  lengths
  - **type**: `number`
  - **default**: 3

```js
const customSlug = generateRandomSlug({
  separator: "_",
  wordList: ["foo", "bar", "baz"],
  wordQuantity: 2;
});
// 'baz_foo'
```

## Details

The list is 682 words long. For three word slugs this results in 315,821,241
potential combinations.

As a bonus, this is 15 times faster (but less featured) than the most popular
NPM package:

```
    CPU | Apple M1 Pro
Runtime | Deno 2.1.2 (aarch64-apple-darwin)

benchmark                 time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------- ----------------------------- --------------------- --------------------------
iwc/random-slug                  599.7 ns     1,668,000 (458.1 ns … 792.2 ns) 633.8 ns 792.2 ns 792.2 ns
nas5w/random-word-slugs            9.1 µs       109,600 (  8.2 µs … 262.5 µs)   8.7 µs  52.2 µs  62.8 µs
```

(thanks [Deno bench](https://docs.deno.com/runtime/reference/cli/bench/))
