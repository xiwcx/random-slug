import { assertEquals, assertThrows } from "@std/assert";
import { defaultWordList, generateRandomSlug } from "./main.ts";
import { generateSlug } from "npm:random-word-slugs";

const findSeparatorQuantity = (str: string, separator: string): number =>
  str.split("").filter((c) => c === separator).length;
const uniqueQuantity = (arr: unknown[]): number =>
  Array.from(new Set(arr)).length;

Deno.test("uniqueWords is the expected length", () => {
  assertEquals(defaultWordList.length, 682);
});

Deno.test("all words in uniqueWords are unique", () => {
  const unique = new Set(defaultWordList);

  assertEquals(unique.size, defaultWordList.length);
});

Deno.test("generate slug works as expected", () => {
  const slugs = new Array(100).fill("").map(() => generateRandomSlug());

  assertEquals(slugs.length, uniqueQuantity(slugs));
});

Deno.test("respects word quantity override", () => {
  const slugTwo = generateRandomSlug({ wordQuantity: 2 });
  const slugThree = generateRandomSlug({ wordQuantity: 3 });
  const slugFour = generateRandomSlug({ wordQuantity: 4 });

  assertEquals(findSeparatorQuantity(slugTwo, "-"), 1);
  assertEquals(findSeparatorQuantity(slugThree, "-"), 2);
  assertEquals(findSeparatorQuantity(slugFour, "-"), 3);
});

Deno.test("respects separator override", () => {
  const slug = generateRandomSlug({ separator: "_" });

  assertEquals(findSeparatorQuantity(slug, "-"), 0);
  assertEquals(findSeparatorQuantity(slug, "_"), 2);
});

Deno.test("respects word list override", () => {
  const words = ["foo", "bar", "baz"];
  const customWordList = new Array(5).fill(words).flat();
  const parsedSlug = generateRandomSlug({ wordList: customWordList }).split(
    "-"
  );
  const filteredSlug = parsedSlug.filter((i) => words.includes(i));

  assertEquals(uniqueQuantity(parsedSlug), uniqueQuantity(filteredSlug));
});

Deno.test(
  "throws error if custom length is greater than word list length",
  () => {
    assertThrows(() =>
      generateRandomSlug({ wordList: ["foo", "bar", "baz"], wordQuantity: 10 })
    );
  }
);

Deno.bench({
  name: "iwc/random-slug",
  fn() {
    generateRandomSlug();
  },
});

/**
 * https://www.npmjs.com/package/random-word-slugs
 */
Deno.bench({
  name: "nas5w/random-word-slugs",
  fn() {
    generateSlug();
  },
});
