import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
  "black-forest-labs/flux-schnell",
  {
    input: {
      prompt: "A cute dog smiling",
      go_fast: true,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "png",
      output_quality: 90,
    },
  }
);

console.log(output);