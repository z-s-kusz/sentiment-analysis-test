# Goal

I created this little script to test out sentiment analysis.
I used NaturalNode but the idea was just to test the concept, not this library's implementation.

# Results

Results were far worse than I thought they would be. Natural language processing
is extremely difficult but I'd hoped some basic sentences would process correctly more often than not.
I had to call this experiment a failure before I even got to some of the more complicated tests I had planned.
That's why the code in index.js has a pointlessly complicated structure for the testing array.

After trying all 3 vocabulary sets that come with NaturalNode on the few test cases I started with
I didn't see any reason to continue testing. Very negative text was rated as slightly negative,
positive text was rated as neutral
and anything that contains a positive word is rated as positive even if the subject in question is not the target.

For example:
If I want to analyze the sentiment specifically about oranges in this phrase: "Apples are better than oranges",
I would expect the analysis to return as "neutral" since apples are the subject of the positivity.
But all of the vocab sets I tested returned positive because the word "better" was used.
That makes sense because there is no way for me to specify "oranges" as the target with this sentiment analysis tool.
But even forgetting that one case, almost all of the other tests failed to report the expected sentiment.

# One final note / An actual use case for LLMs?

Out of curiosity I tried 3 of the tougher tests (including "Apples are better than oranges") with chatGPT 3.5.
I asked it to rate the text as positive, negative or neutral in regards to "oranges"
and it scored them exactly as I would.
