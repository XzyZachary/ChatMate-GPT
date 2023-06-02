/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-10.
 */

/* tslint:disable */
/* eslint-disable */
import type {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig
} from 'axios'
import globalAxios from 'axios'
import type { Configuration } from './configuration'
// Some imports not used depending on template conditions
// @ts-ignore
import type { RequestArgs } from './base'
import {
  DUMMY_BASE_URL,
  assertParamExists,
  createRequestFunction,
  serializeDataIfNeeded,
  setSearchParams,
  toPathString
} from './common'
// @ts-ignore
import { BASE_PATH, BaseAPI, RequiredError } from './base'

export interface CreateAccountBillingUsageRequest {
  start_date: string
  end_date: string
}

/**
 * The usage of the account
 */
export interface CreateAccountBillingUsageResponse {
  object: string
  daily_costs: AccountUsageDailyCost[]
  total_usage: number
}

export interface AccountUsageDailyCost {
  /**
   * The second timestamp of the usage
   */
  timestamp: number
  line_items: {
    /**
     * The name of the model
     */
    name: AccountUsageDailyModelCostName
    /**
     * The cost of the model
     */
    cost: number
  }
}

export enum AccountUsageDailyModelCostName {
  AudioModels = 'Audio models',
  ChatModels = 'Chat models',
  EmbeddingModels = 'Embedding models',
  FineTunedModels = 'Fine-tuned models',
  GPT4 = 'GPT-4',
  ImageModels = 'Image models',
  InstructModels = 'Instruct models'
}

export interface CreateAccountSubscriptionResponse {
  object: string
  has_payment_method: boolean
  canceled: boolean
  canceled_at: null | number
  delinquent: null | number
  access_until: number
  soft_limit: number
  hard_limit: number
  system_hard_limit: number
  soft_limit_usd: number
  hard_limit_usd: number
  system_hard_limit_usd: number
  plan: {
    id: string
    title: string
  }
  account_name: string
  po_number: null | string
  billing_email: null | string
  tax_ids: null | string
  billing_address: null | string
  business_address: null | string
}

export interface ChatCompletionRequestMessage {
  role: ChatCompletionRequestMessageRoleEnum
  /**
   * The contents of the message
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  content: string
  /**
   * The name of the user in a multi-user chat
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  name?: string
}
export type ChatCompletionRequestMessageRoleEnum =
  | 'system'
  | 'user'
  | 'assistant'
export interface ChatCompletionResponseMessage {
  /**
   * The role of the author of this message.
   * @type {string}
   * @memberof ChatCompletionResponseMessage
   */
  role: ChatCompletionResponseMessageRoleEnum
  /**
   * The contents of the message
   * @type {string}
   * @memberof ChatCompletionResponseMessage
   */
  content: string
}
export type ChatCompletionResponseMessageRoleEnum =
  | 'system'
  | 'user'
  | 'assistant'
/**
 * @export
 * @interface CreateAnswerRequest
 */
export interface CreateAnswerRequest {
  /**
   * ID of the model to use for completion. You can select one of `ada`, `babbage`, `curie`, or `davinci`.
   * @type {string}
   * @memberof CreateAnswerRequest
   */
  model: string
  /**
   * Question to get answered.
   * @type {string}
   * @memberof CreateAnswerRequest
   */
  question: string
  /**
   * List of (question, answer) pairs that will help steer the model towards the tone and answer format you\'d like. We recommend adding 2 to 3 examples.
   * @type {Array<any>}
   * @memberof CreateAnswerRequest
   */
  examples: Array<any>
  /**
   * A text snippet containing the contextual information used to generate the answers for the `examples` you provide.
   * @type {string}
   * @memberof CreateAnswerRequest
   */
  examples_context: string
  /**
   * List of documents from which the answer for the input `question` should be derived. If this is an empty list, the question will be answered based on the question-answer examples.  You should specify either `documents` or a `file`, but not both.
   * @type {Array<string>}
   * @memberof CreateAnswerRequest
   */
  documents?: Array<string> | null
  /**
   * The ID of an uploaded file that contains documents to search over. See [upload file](/docs/api-reference/files/upload) for how to upload a file of the desired format and purpose.  You should specify either `documents` or a `file`, but not both.
   * @type {string}
   * @memberof CreateAnswerRequest
   */
  file?: string | null
  /**
   * ID of the model to use for [Search](/docs/api-reference/searches/create). You can select one of `ada`, `babbage`, `curie`, or `davinci`.
   * @type {string}
   * @memberof CreateAnswerRequest
   */
  search_model?: string | null
  /**
   * The maximum number of documents to be ranked by [Search](/docs/api-reference/searches/create) when using `file`. Setting it to a higher value leads to improved accuracy but with increased latency and cost.
   * @type {number}
   * @memberof CreateAnswerRequest
   */
  max_rerank?: number | null
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * @type {number}
   * @memberof CreateAnswerRequest
   */
  temperature?: number | null
  /**
   * Include the log probabilities on the `logprobs` most likely tokens, as well the chosen tokens. For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1` elements in the response.  The maximum value for `logprobs` is 5. If you need more than this, please contact us through our [Help center](https://help.openai.com) and describe your use case.  When `logprobs` is set, `completion` will be automatically added into `expand` to get the logprobs.
   * @type {number}
   * @memberof CreateAnswerRequest
   */
  logprobs?: number | null
  /**
   * The maximum number of tokens allowed for the generated answer
   * @type {number}
   * @memberof CreateAnswerRequest
   */
  max_tokens?: number | null
  /**
   *
   * @type {CreateAnswerRequestStop}
   * @memberof CreateAnswerRequest
   */
  stop?: CreateAnswerRequestStop | null
  /**
   * How many answers to generate for each question.
   * @type {number}
   * @memberof CreateAnswerRequest
   */
  n?: number | null
  /**
   * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) (which works for both GPT-2 and GPT-3) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.  As an example, you can pass `{\"50256\": -100}` to prevent the <|endoftext|> token from being generated.
   * @type {object}
   * @memberof CreateAnswerRequest
   */
  logit_bias?: object | null
  /**
   * A special boolean flag for showing metadata. If set to `true`, each document entry in the returned JSON will contain a \"metadata\" field.  This flag only takes effect when `file` is set.
   * @type {boolean}
   * @memberof CreateAnswerRequest
   */
  return_metadata?: boolean | null
  /**
   * If set to `true`, the returned JSON will include a \"prompt\" field containing the final prompt that was used to request a completion. This is mainly useful for debugging purposes.
   * @type {boolean}
   * @memberof CreateAnswerRequest
   */
  return_prompt?: boolean | null
  /**
   * If an object name is in the list, we provide the full information of the object; otherwise, we only provide the object ID. Currently we support `completion` and `file` objects for expansion.
   * @type {Array<any>}
   * @memberof CreateAnswerRequest
   */
  expand?: Array<any> | null
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateAnswerRequest
   */
  user?: string
}
/**
 * @type CreateAnswerRequestStop
 * Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
 * @export
 */
export type CreateAnswerRequestStop = Array<string> | string
/**
 *
 * @export
 * @interface CreateAnswerResponse
 */
export interface CreateAnswerResponse {
  /**
   *
   * @type {string}
   * @memberof CreateAnswerResponse
   */
  object?: string
  /**
   *
   * @type {string}
   * @memberof CreateAnswerResponse
   */
  model?: string
  /**
   *
   * @type {string}
   * @memberof CreateAnswerResponse
   */
  search_model?: string
  /**
   *
   * @type {string}
   * @memberof CreateAnswerResponse
   */
  completion?: string
  /**
   *
   * @type {Array<string>}
   * @memberof CreateAnswerResponse
   */
  answers?: Array<string>
  /**
   *
   * @type {Array<CreateAnswerResponseSelectedDocumentsInner>}
   * @memberof CreateAnswerResponse
   */
  selected_documents?: Array<CreateAnswerResponseSelectedDocumentsInner>
}
/**
 *
 * @export
 * @interface CreateAnswerResponseSelectedDocumentsInner
 */
export interface CreateAnswerResponseSelectedDocumentsInner {
  /**
   *
   * @type {number}
   * @memberof CreateAnswerResponseSelectedDocumentsInner
   */
  document?: number
  /**
   *
   * @type {string}
   * @memberof CreateAnswerResponseSelectedDocumentsInner
   */
  text?: string
}
/**
 *
 * @export
 * @interface CreateChatCompletionRequest
 */
export interface CreateChatCompletionRequest {
  /**
   * ID of the model to use. Currently, only `gpt-3.5-turbo` and `gpt-3.5-turbo-0301` are supported.
   * @type {string}
   * @memberof CreateChatCompletionRequest
   */
  model?: string
  /**
   * The messages to generate chat completions for, in the [chat format](/docs/guides/chat/introduction).
   * @type {Array<ChatCompletionRequestMessage>}
   * @memberof CreateChatCompletionRequest
   */
  messages?: Array<ChatCompletionRequestMessage>
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.  We generally recommend altering this or `top_p` but not both.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  temperature?: number | null
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  top_p?: number | null
  /**
   * How many chat completion choices to generate for each input message.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  n?: number | null
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message.
   * @type {boolean}
   * @memberof CreateChatCompletionRequest
   */
  stream?: boolean | null
  /**
   *
   * @type {CreateChatCompletionRequestStop}
   * @memberof CreateChatCompletionRequest
   */
  stop?: CreateChatCompletionRequestStop
  /**
   * The maximum number of tokens allowed for the generated answer. By default, the number of tokens the model can return will be (4096 - prompt tokens).
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  max_tokens?: number
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  presence_penalty?: number | null
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  frequency_penalty?: number | null
  /**
   * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.
   * @type {object}
   * @memberof CreateChatCompletionRequest
   */
  logit_bias?: object | null
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateChatCompletionRequest
   */
  user?: string
}
/**
 * @type CreateChatCompletionRequestStop
 * Up to 4 sequences where the API will stop generating further tokens.
 * @export
 */
export type CreateChatCompletionRequestStop = Array<string> | string
/**
 *
 * @export
 * @interface CreateChatCompletionResponse
 */
export interface CreateChatCompletionResponse {
  /**
   *
   * @type {string}
   * @memberof CreateChatCompletionResponse
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof CreateChatCompletionResponse
   */
  object: string
  /**
   *
   * @type {number}
   * @memberof CreateChatCompletionResponse
   */
  created: number
  /**
   *
   * @type {string}
   * @memberof CreateChatCompletionResponse
   */
  model: string
  /**
   *
   * @type {Array<CreateChatCompletionResponseChoicesInner>}
   * @memberof CreateChatCompletionResponse
   */
  choices: Array<CreateChatCompletionResponseChoicesInner>
  /**
   *
   * @type {CreateCompletionResponseUsage}
   * @memberof CreateChatCompletionResponse
   */
  usage?: CreateCompletionResponseUsage
}
/**
 *
 * @export
 * @interface CreateChatCompletionResponseChoicesInner
 */
export interface CreateChatCompletionResponseChoicesInner {
  /**
   *
   * @type {number}
   * @memberof CreateChatCompletionResponseChoicesInner
   */
  index?: number
  /**
   *
   * @type {ChatCompletionResponseMessage}
   * @memberof CreateChatCompletionResponseChoicesInner
   */
  message?: ChatCompletionResponseMessage
  /**
   *
   * @type {string}
   * @memberof CreateChatCompletionResponseChoicesInner
   */
  finish_reason?: string
}
/**
 *
 * @export
 * @interface CreateClassificationRequest
 */
export interface CreateClassificationRequest {
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models/overview) for descriptions of them.
   * @type {string}
   * @memberof CreateClassificationRequest
   */
  model: string
  /**
   * Query to be classified.
   * @type {string}
   * @memberof CreateClassificationRequest
   */
  query: string
  /**
   * A list of examples with labels, in the following format:  `[[\"The movie is so interesting.\", \"Positive\"], [\"It is quite boring.\", \"Negative\"], ...]`  All the label strings will be normalized to be capitalized.  You should specify either `examples` or `file`, but not both.
   * @type {Array<any>}
   * @memberof CreateClassificationRequest
   */
  examples?: Array<any> | null
  /**
   * The ID of the uploaded file that contains training examples. See [upload file](/docs/api-reference/files/upload) for how to upload a file of the desired format and purpose.  You should specify either `examples` or `file`, but not both.
   * @type {string}
   * @memberof CreateClassificationRequest
   */
  file?: string | null
  /**
   * The set of categories being classified. If not specified, candidate labels will be automatically collected from the examples you provide. All the label strings will be normalized to be capitalized.
   * @type {Array<string>}
   * @memberof CreateClassificationRequest
   */
  labels?: Array<string> | null
  /**
   * ID of the model to use for [Search](/docs/api-reference/searches/create). You can select one of `ada`, `babbage`, `curie`, or `davinci`.
   * @type {string}
   * @memberof CreateClassificationRequest
   */
  search_model?: string | null
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * @type {number}
   * @memberof CreateClassificationRequest
   */
  temperature?: number | null
  /**
   * Include the log probabilities on the `logprobs` most likely tokens, as well the chosen tokens. For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1` elements in the response.  The maximum value for `logprobs` is 5. If you need more than this, please contact us through our [Help center](https://help.openai.com) and describe your use case.  When `logprobs` is set, `completion` will be automatically added into `expand` to get the logprobs.
   * @type {number}
   * @memberof CreateClassificationRequest
   */
  logprobs?: number | null
  /**
   * The maximum number of examples to be ranked by [Search](/docs/api-reference/searches/create) when using `file`. Setting it to a higher value leads to improved accuracy but with increased latency and cost.
   * @type {number}
   * @memberof CreateClassificationRequest
   */
  max_examples?: number | null
  /**
   * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) (which works for both GPT-2 and GPT-3) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.  As an example, you can pass `{\"50256\": -100}` to prevent the <|endoftext|> token from being generated.
   * @type {object}
   * @memberof CreateClassificationRequest
   */
  logit_bias?: object | null
  /**
   * If set to `true`, the returned JSON will include a \"prompt\" field containing the final prompt that was used to request a completion. This is mainly useful for debugging purposes.
   * @type {boolean}
   * @memberof CreateClassificationRequest
   */
  return_prompt?: boolean | null
  /**
   * A special boolean flag for showing metadata. If set to `true`, each document entry in the returned JSON will contain a \"metadata\" field.  This flag only takes effect when `file` is set.
   * @type {boolean}
   * @memberof CreateClassificationRequest
   */
  return_metadata?: boolean | null
  /**
   * If an object name is in the list, we provide the full information of the object; otherwise, we only provide the object ID. Currently we support `completion` and `file` objects for expansion.
   * @type {Array<any>}
   * @memberof CreateClassificationRequest
   */
  expand?: Array<any> | null
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateClassificationRequest
   */
  user?: string
}
/**
 *
 * @export
 * @interface CreateClassificationResponse
 */
export interface CreateClassificationResponse {
  /**
   *
   * @type {string}
   * @memberof CreateClassificationResponse
   */
  object?: string
  /**
   *
   * @type {string}
   * @memberof CreateClassificationResponse
   */
  model?: string
  /**
   *
   * @type {string}
   * @memberof CreateClassificationResponse
   */
  search_model?: string
  /**
   *
   * @type {string}
   * @memberof CreateClassificationResponse
   */
  completion?: string
  /**
   *
   * @type {string}
   * @memberof CreateClassificationResponse
   */
  label?: string
  /**
   *
   * @type {Array<CreateClassificationResponseSelectedExamplesInner>}
   * @memberof CreateClassificationResponse
   */
  selected_examples?: Array<CreateClassificationResponseSelectedExamplesInner>
}
/**
 *
 * @export
 * @interface CreateClassificationResponseSelectedExamplesInner
 */
export interface CreateClassificationResponseSelectedExamplesInner {
  /**
   *
   * @type {number}
   * @memberof CreateClassificationResponseSelectedExamplesInner
   */
  document?: number
  /**
   *
   * @type {string}
   * @memberof CreateClassificationResponseSelectedExamplesInner
   */
  text?: string
  /**
   *
   * @type {string}
   * @memberof CreateClassificationResponseSelectedExamplesInner
   */
  label?: string
}
/**
 *
 * @export
 * @interface CreateCompletionRequest
 */
export interface CreateCompletionRequest {
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models/overview) for descriptions of them.
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  model?: string
  /**
   *
   * @type {CreateCompletionRequestPrompt}
   * @memberof CreateCompletionRequest
   */
  prompt?: CreateCompletionRequestPrompt | null
  /**
   * The suffix that comes after a completion of inserted text.
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  suffix?: string | null
  /**
   * The maximum number of [tokens](/tokenizer) to generate in the completion.  The token count of your prompt plus `max_tokens` cannot exceed the model\'s context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  max_tokens?: number | null
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.  We generally recommend altering this or `top_p` but not both.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  temperature?: number | null
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  top_p?: number | null
  /**
   * How many completions to generate for each prompt.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  n?: number | null
  /**
   * Whether to stream back partial progress. If set, tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message.
   * @type {boolean}
   * @memberof CreateCompletionRequest
   */
  stream?: boolean | null
  /**
   * Include the log probabilities on the `logprobs` most likely tokens, as well the chosen tokens. For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1` elements in the response.  The maximum value for `logprobs` is 5. If you need more than this, please contact us through our [Help center](https://help.openai.com) and describe your use case.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  logprobs?: number | null
  /**
   * Echo back the prompt in addition to the completion
   * @type {boolean}
   * @memberof CreateCompletionRequest
   */
  echo?: boolean | null
  /**
   *
   * @type {CreateCompletionRequestStop}
   * @memberof CreateCompletionRequest
   */
  stop?: CreateCompletionRequestStop | null
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  presence_penalty?: number | null
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  frequency_penalty?: number | null
  /**
   * Generates `best_of` completions server-side and returns the \"best\" (the one with the highest log probability per token). Results cannot be streamed.  When used with `n`, `best_of` controls the number of candidate completions and `n` specifies how many to return – `best_of` must be greater than `n`.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  best_of?: number | null
  /**
   * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) (which works for both GPT-2 and GPT-3) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.  As an example, you can pass `{\"50256\": -100}` to prevent the <|endoftext|> token from being generated.
   * @type {object}
   * @memberof CreateCompletionRequest
   */
  logit_bias?: object | null
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  user?: string
}
/**
 * @type CreateCompletionRequestPrompt
 * The prompt(s) to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays.  Note that <|endoftext|> is the document separator that the model sees during training, so if a prompt is not specified the model will generate as if from the beginning of a new document.
 * @export
 */
export type CreateCompletionRequestPrompt =
  | Array<any>
  | Array<number>
  | Array<string>
  | string
/**
 * @type CreateCompletionRequestStop
 * Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
 * @export
 */
export type CreateCompletionRequestStop = Array<string> | string
/**
 *
 * @export
 * @interface CreateCompletionResponse
 */
export interface CreateCompletionResponse {
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponse
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponse
   */
  object: string
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponse
   */
  created: number
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponse
   */
  model: string
  /**
   *
   * @type {Array<CreateCompletionResponseChoicesInner>}
   * @memberof CreateCompletionResponse
   */
  choices: Array<CreateCompletionResponseChoicesInner>
  /**
   *
   * @type {CreateCompletionResponseUsage}
   * @memberof CreateCompletionResponse
   */
  usage?: CreateCompletionResponseUsage
}
/**
 *
 * @export
 * @interface CreateCompletionResponseChoicesInner
 */
export interface CreateCompletionResponseChoicesInner {
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponseChoicesInner
   */
  text?: string
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponseChoicesInner
   */
  index?: number
  /**
   *
   * @type {CreateCompletionResponseChoicesInnerLogprobs}
   * @memberof CreateCompletionResponseChoicesInner
   */
  logprobs?: CreateCompletionResponseChoicesInnerLogprobs | null
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponseChoicesInner
   */
  finish_reason?: string
}
/**
 *
 * @export
 * @interface CreateCompletionResponseChoicesInnerLogprobs
 */
export interface CreateCompletionResponseChoicesInnerLogprobs {
  /**
   *
   * @type {Array<string>}
   * @memberof CreateCompletionResponseChoicesInnerLogprobs
   */
  tokens?: Array<string>
  /**
   *
   * @type {Array<number>}
   * @memberof CreateCompletionResponseChoicesInnerLogprobs
   */
  token_logprobs?: Array<number>
  /**
   *
   * @type {Array<object>}
   * @memberof CreateCompletionResponseChoicesInnerLogprobs
   */
  top_logprobs?: Array<object>
  /**
   *
   * @type {Array<number>}
   * @memberof CreateCompletionResponseChoicesInnerLogprobs
   */
  text_offset?: Array<number>
}
/**
 *
 * @export
 * @interface CreateCompletionResponseUsage
 */
export interface CreateCompletionResponseUsage {
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponseUsage
   */
  prompt_tokens: number
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponseUsage
   */
  completion_tokens: number
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponseUsage
   */
  total_tokens: number
}
/**
 *
 * @export
 * @interface CreateEditRequest
 */
export interface CreateEditRequest {
  /**
   * ID of the model to use. You can use the `text-davinci-edit-001` or `code-davinci-edit-001` model with this endpoint.
   * @type {string}
   * @memberof CreateEditRequest
   */
  model: string
  /**
   * The input text to use as a starting point for the edit.
   * @type {string}
   * @memberof CreateEditRequest
   */
  input?: string | null
  /**
   * The instruction that tells the model how to edit the prompt.
   * @type {string}
   * @memberof CreateEditRequest
   */
  instruction: string
  /**
   * How many edits to generate for the input and instruction.
   * @type {number}
   * @memberof CreateEditRequest
   */
  n?: number | null
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.  We generally recommend altering this or `top_p` but not both.
   * @type {number}
   * @memberof CreateEditRequest
   */
  temperature?: number | null
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
   * @type {number}
   * @memberof CreateEditRequest
   */
  top_p?: number | null
}
/**
 *
 * @export
 * @interface CreateEditResponse
 */
export interface CreateEditResponse {
  /**
   *
   * @type {string}
   * @memberof CreateEditResponse
   */
  object: string
  /**
   *
   * @type {number}
   * @memberof CreateEditResponse
   */
  created: number
  /**
   *
   * @type {Array<CreateCompletionResponseChoicesInner>}
   * @memberof CreateEditResponse
   */
  choices: Array<CreateCompletionResponseChoicesInner>
  /**
   *
   * @type {CreateCompletionResponseUsage}
   * @memberof CreateEditResponse
   */
  usage: CreateCompletionResponseUsage
}
/**
 *
 * @export
 * @interface CreateEmbeddingRequest
 */
export interface CreateEmbeddingRequest {
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models/overview) for descriptions of them.
   * @type {string}
   * @memberof CreateEmbeddingRequest
   */
  model: string
  /**
   *
   * @type {CreateEmbeddingRequestInput}
   * @memberof CreateEmbeddingRequest
   */
  input: CreateEmbeddingRequestInput
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateEmbeddingRequest
   */
  user?: string
}
/**
 * @type CreateEmbeddingRequestInput
 * Input text to get embeddings for, encoded as a string or array of tokens. To get embeddings for multiple inputs in a single request, pass an array of strings or array of token arrays. Each input must not exceed 8192 tokens in length.
 * @export
 */
export type CreateEmbeddingRequestInput =
  | Array<any>
  | Array<number>
  | Array<string>
  | string
/**
 *
 * @export
 * @interface CreateEmbeddingResponse
 */
export interface CreateEmbeddingResponse {
  /**
   *
   * @type {string}
   * @memberof CreateEmbeddingResponse
   */
  object: string
  /**
   *
   * @type {string}
   * @memberof CreateEmbeddingResponse
   */
  model: string
  /**
   *
   * @type {Array<CreateEmbeddingResponseDataInner>}
   * @memberof CreateEmbeddingResponse
   */
  data: Array<CreateEmbeddingResponseDataInner>
  /**
   *
   * @type {CreateEmbeddingResponseUsage}
   * @memberof CreateEmbeddingResponse
   */
  usage: CreateEmbeddingResponseUsage
}
/**
 *
 * @export
 * @interface CreateEmbeddingResponseDataInner
 */
export interface CreateEmbeddingResponseDataInner {
  /**
   *
   * @type {number}
   * @memberof CreateEmbeddingResponseDataInner
   */
  index: number
  /**
   *
   * @type {string}
   * @memberof CreateEmbeddingResponseDataInner
   */
  object: string
  /**
   *
   * @type {Array<number>}
   * @memberof CreateEmbeddingResponseDataInner
   */
  embedding: Array<number>
}
/**
 *
 * @export
 * @interface CreateEmbeddingResponseUsage
 */
export interface CreateEmbeddingResponseUsage {
  /**
   *
   * @type {number}
   * @memberof CreateEmbeddingResponseUsage
   */
  prompt_tokens: number
  /**
   *
   * @type {number}
   * @memberof CreateEmbeddingResponseUsage
   */
  total_tokens: number
}
/**
 *
 * @export
 * @interface CreateFineTuneRequest
 */
export interface CreateFineTuneRequest {
  /**
   * The ID of an uploaded file that contains training data.  See [upload file](/docs/api-reference/files/upload) for how to upload a file.  Your dataset must be formatted as a JSONL file, where each training example is a JSON object with the keys \"prompt\" and \"completion\". Additionally, you must upload your file with the purpose `fine-tune`.  See the [fine-tuning guide](/docs/guides/fine-tuning/creating-training-data) for more details.
   * @type {string}
   * @memberof CreateFineTuneRequest
   */
  training_file: string
  /**
   * The ID of an uploaded file that contains validation data.  If you provide this file, the data is used to generate validation metrics periodically during fine-tuning. These metrics can be viewed in the [fine-tuning results file](/docs/guides/fine-tuning/analyzing-your-fine-tuned-model). Your train and validation data should be mutually exclusive.  Your dataset must be formatted as a JSONL file, where each validation example is a JSON object with the keys \"prompt\" and \"completion\". Additionally, you must upload your file with the purpose `fine-tune`.  See the [fine-tuning guide](/docs/guides/fine-tuning/creating-training-data) for more details.
   * @type {string}
   * @memberof CreateFineTuneRequest
   */
  validation_file?: string | null
  /**
   * The name of the base model to fine-tune. You can select one of \"ada\", \"babbage\", \"curie\", \"davinci\", or a fine-tuned model created after 2022-04-21. To learn more about these models, see the [Models](https://platform.openai.com/docs/models) documentation.
   * @type {string}
   * @memberof CreateFineTuneRequest
   */
  model?: string | null
  /**
   * The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.
   * @type {number}
   * @memberof CreateFineTuneRequest
   */
  n_epochs?: number | null
  /**
   * The batch size to use for training. The batch size is the number of training examples used to train a single forward and backward pass.  By default, the batch size will be dynamically configured to be ~0.2% of the number of examples in the training set, capped at 256 - in general, we\'ve found that larger batch sizes tend to work better for larger datasets.
   * @type {number}
   * @memberof CreateFineTuneRequest
   */
  batch_size?: number | null
  /**
   * The learning rate multiplier to use for training. The fine-tuning learning rate is the original learning rate used for pretraining multiplied by this value.  By default, the learning rate multiplier is the 0.05, 0.1, or 0.2 depending on final `batch_size` (larger learning rates tend to perform better with larger batch sizes). We recommend experimenting with values in the range 0.02 to 0.2 to see what produces the best results.
   * @type {number}
   * @memberof CreateFineTuneRequest
   */
  learning_rate_multiplier?: number | null
  /**
   * The weight to use for loss on the prompt tokens. This controls how much the model tries to learn to generate the prompt (as compared to the completion which always has a weight of 1.0), and can add a stabilizing effect to training when completions are short.  If prompts are extremely long (relative to completions), it may make sense to reduce this weight so as to avoid over-prioritizing learning the prompt.
   * @type {number}
   * @memberof CreateFineTuneRequest
   */
  prompt_loss_weight?: number | null
  /**
   * If set, we calculate classification-specific metrics such as accuracy and F-1 score using the validation set at the end of every epoch. These metrics can be viewed in the [results file](/docs/guides/fine-tuning/analyzing-your-fine-tuned-model).  In order to compute classification metrics, you must provide a `validation_file`. Additionally, you must specify `classification_n_classes` for multiclass classification or `classification_positive_class` for binary classification.
   * @type {boolean}
   * @memberof CreateFineTuneRequest
   */
  compute_classification_metrics?: boolean | null
  /**
   * The number of classes in a classification task.  This parameter is required for multiclass classification.
   * @type {number}
   * @memberof CreateFineTuneRequest
   */
  classification_n_classes?: number | null
  /**
   * The positive class in binary classification.  This parameter is needed to generate precision, recall, and F1 metrics when doing binary classification.
   * @type {string}
   * @memberof CreateFineTuneRequest
   */
  classification_positive_class?: string | null
  /**
   * If this is provided, we calculate F-beta scores at the specified beta values. The F-beta score is a generalization of F-1 score. This is only used for binary classification.  With a beta of 1 (i.e. the F-1 score), precision and recall are given the same weight. A larger beta score puts more weight on recall and less on precision. A smaller beta score puts more weight on precision and less on recall.
   * @type {Array<number>}
   * @memberof CreateFineTuneRequest
   */
  classification_betas?: Array<number> | null
  /**
   * A string of up to 40 characters that will be added to your fine-tuned model name.  For example, a `suffix` of \"custom-model-name\" would produce a model name like `ada:ft-your-org:custom-model-name-2022-02-15-04-21-04`.
   * @type {string}
   * @memberof CreateFineTuneRequest
   */
  suffix?: string | null
}
/**
 *
 * @export
 * @interface CreateImageRequest
 */
export interface CreateImageRequest {
  /**
   * A text description of the desired image(s). The maximum length is 1000 characters.
   * @type {string}
   * @memberof CreateImageRequest
   */
  prompt: string
  /**
   * The number of images to generate. Must be between 1 and 10.
   * @type {number}
   * @memberof CreateImageRequest
   */
  n?: number | null
  /**
   * The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.
   * @type {string}
   * @memberof CreateImageRequest
   */
  size?: CreateImageRequestSizeEnum
  /**
   * The format in which the generated images are returned. Must be one of `url` or `b64_json`.
   * @type {string}
   * @memberof CreateImageRequest
   */
  response_format?: CreateImageRequestResponseFormatEnum
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateImageRequest
   */
  user?: string
}
export type CreateImageRequestSizeEnum =
  | '256x256'
  | '512x512'
  | '1024x1024'
export type CreateImageRequestResponseFormatEnum = 'url' | 'b64_json'
/**
 *
 * @export
 * @interface CreateModerationRequest
 */
export interface CreateModerationRequest {
  /**
   *
   * @type {CreateModerationRequestInput}
   * @memberof CreateModerationRequest
   */
  input: CreateModerationRequestInput
  /**
   * Two content moderations models are available: `text-moderation-stable` and `text-moderation-latest`.  The default is `text-moderation-latest` which will be automatically upgraded over time. This ensures you are always using our most accurate model. If you use `text-moderation-stable`, we will provide advanced notice before updating the model. Accuracy of `text-moderation-stable` may be slightly lower than for `text-moderation-latest`.
   * @type {string}
   * @memberof CreateModerationRequest
   */
  model?: string
}
/**
 * @type CreateModerationRequestInput
 * The input text to classify
 * @export
 */
export type CreateModerationRequestInput = Array<string> | string
/**
 *
 * @export
 * @interface CreateModerationResponse
 */
export interface CreateModerationResponse {
  /**
   *
   * @type {string}
   * @memberof CreateModerationResponse
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof CreateModerationResponse
   */
  model: string
  /**
   *
   * @type {Array<CreateModerationResponseResultsInner>}
   * @memberof CreateModerationResponse
   */
  results: Array<CreateModerationResponseResultsInner>
}
/**
 *
 * @export
 * @interface CreateModerationResponseResultsInner
 */
export interface CreateModerationResponseResultsInner {
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInner
   */
  flagged: boolean
  /**
   *
   * @type {CreateModerationResponseResultsInnerCategories}
   * @memberof CreateModerationResponseResultsInner
   */
  categories: CreateModerationResponseResultsInnerCategories
  /**
   *
   * @type {CreateModerationResponseResultsInnerCategoryScores}
   * @memberof CreateModerationResponseResultsInner
   */
  category_scores: CreateModerationResponseResultsInnerCategoryScores
}
/**
 *
 * @export
 * @interface CreateModerationResponseResultsInnerCategories
 */
export interface CreateModerationResponseResultsInnerCategories {
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'hate': boolean
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'hate/threatening': boolean
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'self-harm': boolean
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'sexual': boolean
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'sexual/minors': boolean
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'violence': boolean
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'violence/graphic': boolean
}
/**
 *
 * @export
 * @interface CreateModerationResponseResultsInnerCategoryScores
 */
export interface CreateModerationResponseResultsInnerCategoryScores {
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'hate': number
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'hate/threatening': number
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'self-harm': number
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'sexual': number
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'sexual/minors': number
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'violence': number
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'violence/graphic': number
}
/**
 *
 * @export
 * @interface CreateSearchRequest
 */
export interface CreateSearchRequest {
  /**
   * Query to search against the documents.
   * @type {string}
   * @memberof CreateSearchRequest
   */
  query: string
  /**
   * Up to 200 documents to search over, provided as a list of strings.  The maximum document length (in tokens) is 2034 minus the number of tokens in the query.  You should specify either `documents` or a `file`, but not both.
   * @type {Array<string>}
   * @memberof CreateSearchRequest
   */
  documents?: Array<string> | null
  /**
   * The ID of an uploaded file that contains documents to search over.  You should specify either `documents` or a `file`, but not both.
   * @type {string}
   * @memberof CreateSearchRequest
   */
  file?: string | null
  /**
   * The maximum number of documents to be re-ranked and returned by search.  This flag only takes effect when `file` is set.
   * @type {number}
   * @memberof CreateSearchRequest
   */
  max_rerank?: number | null
  /**
   * A special boolean flag for showing metadata. If set to `true`, each document entry in the returned JSON will contain a \"metadata\" field.  This flag only takes effect when `file` is set.
   * @type {boolean}
   * @memberof CreateSearchRequest
   */
  return_metadata?: boolean | null
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateSearchRequest
   */
  user?: string
}
/**
 *
 * @export
 * @interface CreateSearchResponse
 */
export interface CreateSearchResponse {
  /**
   *
   * @type {string}
   * @memberof CreateSearchResponse
   */
  object?: string
  /**
   *
   * @type {string}
   * @memberof CreateSearchResponse
   */
  model?: string
  /**
   *
   * @type {Array<CreateSearchResponseDataInner>}
   * @memberof CreateSearchResponse
   */
  data?: Array<CreateSearchResponseDataInner>
}
/**
 *
 * @export
 * @interface CreateSearchResponseDataInner
 */
export interface CreateSearchResponseDataInner {
  /**
   *
   * @type {string}
   * @memberof CreateSearchResponseDataInner
   */
  object?: string
  /**
   *
   * @type {number}
   * @memberof CreateSearchResponseDataInner
   */
  document?: number
  /**
   *
   * @type {number}
   * @memberof CreateSearchResponseDataInner
   */
  score?: number
}
/**
 *
 * @export
 * @interface CreateTranscriptionResponse
 */
export interface CreateTranscriptionResponse {
  /**
   *
   * @type {string}
   * @memberof CreateTranscriptionResponse
   */
  text: string
}
/**
 *
 * @export
 * @interface CreateTranslationResponse
 */
export interface CreateTranslationResponse {
  /**
   *
   * @type {string}
   * @memberof CreateTranslationResponse
   */
  text: string
}
/**
 *
 * @export
 * @interface DeleteFileResponse
 */
export interface DeleteFileResponse {
  /**
   *
   * @type {string}
   * @memberof DeleteFileResponse
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof DeleteFileResponse
   */
  object: string
  /**
   *
   * @type {boolean}
   * @memberof DeleteFileResponse
   */
  deleted: boolean
}
/**
 *
 * @export
 * @interface DeleteModelResponse
 */
export interface DeleteModelResponse {
  /**
   *
   * @type {string}
   * @memberof DeleteModelResponse
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof DeleteModelResponse
   */
  object: string
  /**
   *
   * @type {boolean}
   * @memberof DeleteModelResponse
   */
  deleted: boolean
}
/**
 *
 * @export
 * @interface Engine
 */
export interface Engine {
  /**
   *
   * @type {string}
   * @memberof Engine
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof Engine
   */
  object: string
  /**
   *
   * @type {number}
   * @memberof Engine
   */
  created: number | null
  /**
   *
   * @type {boolean}
   * @memberof Engine
   */
  ready: boolean
}
/**
 *
 * @export
 * @interface FineTune
 */
export interface FineTune {
  /**
   *
   * @type {string}
   * @memberof FineTune
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof FineTune
   */
  object: string
  /**
   *
   * @type {number}
   * @memberof FineTune
   */
  created_at: number
  /**
   *
   * @type {number}
   * @memberof FineTune
   */
  updated_at: number
  /**
   *
   * @type {string}
   * @memberof FineTune
   */
  model: string
  /**
   *
   * @type {string}
   * @memberof FineTune
   */
  fine_tuned_model: string | null
  /**
   *
   * @type {string}
   * @memberof FineTune
   */
  organization_id: string
  /**
   *
   * @type {string}
   * @memberof FineTune
   */
  status: string
  /**
   *
   * @type {object}
   * @memberof FineTune
   */
  hyperparams: object
  /**
   *
   * @type {Array<OpenAIFile>}
   * @memberof FineTune
   */
  training_files: Array<OpenAIFile>
  /**
   *
   * @type {Array<OpenAIFile>}
   * @memberof FineTune
   */
  validation_files: Array<OpenAIFile>
  /**
   *
   * @type {Array<OpenAIFile>}
   * @memberof FineTune
   */
  result_files: Array<OpenAIFile>
  /**
   *
   * @type {Array<FineTuneEvent>}
   * @memberof FineTune
   */
  events?: Array<FineTuneEvent>
}
/**
 *
 * @export
 * @interface FineTuneEvent
 */
export interface FineTuneEvent {
  /**
   *
   * @type {string}
   * @memberof FineTuneEvent
   */
  object: string
  /**
   *
   * @type {number}
   * @memberof FineTuneEvent
   */
  created_at: number
  /**
   *
   * @type {string}
   * @memberof FineTuneEvent
   */
  level: string
  /**
   *
   * @type {string}
   * @memberof FineTuneEvent
   */
  message: string
}
/**
 *
 * @export
 * @interface ImagesResponse
 */
export interface ImagesResponse {
  /**
   *
   * @type {number}
   * @memberof ImagesResponse
   */
  created: number
  /**
   *
   * @type {Array<ImagesResponseDataInner>}
   * @memberof ImagesResponse
   */
  data: Array<ImagesResponseDataInner>
}
/**
 *
 * @export
 * @interface ImagesResponseDataInner
 */
export interface ImagesResponseDataInner {
  /**
   *
   * @type {string}
   * @memberof ImagesResponseDataInner
   */
  url?: string
  /**
   *
   * @type {string}
   * @memberof ImagesResponseDataInner
   */
  b64_json?: string
}
/**
 *
 * @export
 * @interface ListEnginesResponse
 */
export interface ListEnginesResponse {
  /**
   *
   * @type {string}
   * @memberof ListEnginesResponse
   */
  object: string
  /**
   *
   * @type {Array<Engine>}
   * @memberof ListEnginesResponse
   */
  data: Array<Engine>
}
/**
 *
 * @export
 * @interface ListFilesResponse
 */
export interface ListFilesResponse {
  /**
   *
   * @type {string}
   * @memberof ListFilesResponse
   */
  object: string
  /**
   *
   * @type {Array<OpenAIFile>}
   * @memberof ListFilesResponse
   */
  data: Array<OpenAIFile>
}
/**
 *
 * @export
 * @interface ListFineTuneEventsResponse
 */
export interface ListFineTuneEventsResponse {
  /**
   *
   * @type {string}
   * @memberof ListFineTuneEventsResponse
   */
  object: string
  /**
   *
   * @type {Array<FineTuneEvent>}
   * @memberof ListFineTuneEventsResponse
   */
  data: Array<FineTuneEvent>
}
/**
 *
 * @export
 * @interface ListFineTunesResponse
 */
export interface ListFineTunesResponse {
  /**
   *
   * @type {string}
   * @memberof ListFineTunesResponse
   */
  object: string
  /**
   *
   * @type {Array<FineTune>}
   * @memberof ListFineTunesResponse
   */
  data: Array<FineTune>
}
/**
 *
 * @export
 * @interface ListModelsResponse
 */
export interface ListModelsResponse {
  /**
   *
   * @type {string}
   * @memberof ListModelsResponse
   */
  object: string
  /**
   *
   * @type {Array<Model>}
   * @memberof ListModelsResponse
   */
  data: Array<Model>
}
/**
 *
 * @export
 * @interface Model
 */
export interface Model {
  /**
   *
   * @type {string}
   * @memberof Model
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof Model
   */
  object: string
  /**
   *
   * @type {number}
   * @memberof Model
   */
  created: number
  /**
   *
   * @type {string}
   * @memberof Model
   */
  owned_by: string
}
/**
 *
 * @export
 * @interface OpenAIFile
 */
export interface OpenAIFile {
  /**
   *
   * @type {string}
   * @memberof OpenAIFile
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof OpenAIFile
   */
  object: string
  /**
   *
   * @type {number}
   * @memberof OpenAIFile
   */
  bytes: number
  /**
   *
   * @type {number}
   * @memberof OpenAIFile
   */
  created_at: number
  /**
   *
   * @type {string}
   * @memberof OpenAIFile
   */
  filename: string
  /**
   *
   * @type {string}
   * @memberof OpenAIFile
   */
  purpose: string
  /**
   *
   * @type {string}
   * @memberof OpenAIFile
   */
  status?: string
  /**
   *
   * @type {object}
   * @memberof OpenAIFile
   */
  status_details?: object | null
}
/**
 * OpenAIApi - axios parameter creator
 * @export
 */
export const OpenAIApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Immediately cancel a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to cancel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cancelFineTune: async (
      fineTuneId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'fineTuneId' is not null or undefined
      assertParamExists('cancelFineTune', 'fineTuneId', fineTuneId)
      const localVarPath =
        `/fine-tunes/{fine_tune_id}/cancel`.replace(
          `{${'fine_tune_id'}}`,
          encodeURIComponent(String(fineTuneId))
        )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
     * @param {CreateAnswerRequest} createAnswerRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createAnswer: async (
      createAnswerRequest: CreateAnswerRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createAnswerRequest' is not null or undefined
      assertParamExists(
        'createAnswer',
        'createAnswerRequest',
        createAnswerRequest
      )
      const localVarPath = `/answers`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createAnswerRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Creates a completion for the chat message
     * @param {CreateChatCompletionRequest} createChatCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createChatCompletion: async (
      createChatCompletionRequest: CreateChatCompletionRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createChatCompletionRequest' is not null or undefined
      assertParamExists(
        'createChatCompletion',
        'createChatCompletionRequest',
        createChatCompletionRequest
      )
      const localVarPath = `/chat/completions`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createChatCompletionRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
     * @param {CreateClassificationRequest} createClassificationRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createClassification: async (
      createClassificationRequest: CreateClassificationRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createClassificationRequest' is not null or undefined
      assertParamExists(
        'createClassification',
        'createClassificationRequest',
        createClassificationRequest
      )
      const localVarPath = `/classifications`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createClassificationRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    createAccountBillingUsage: async (
      createAccountBillingUsageRequest: CreateAccountBillingUsageRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      assertParamExists(
        'createAccountBillingUsage',
        'createAccountBillingUsageRequest',
        createAccountBillingUsageRequest
      )
      const localVarPath = `/dashboard/billing/usage`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter =
        createAccountBillingUsageRequest as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    createAccountSubscription: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/dashboard/billing/subscription`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Creates a completion for the provided prompt and parameters
     * @param {CreateCompletionRequest} createCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCompletion: async (
      createCompletionRequest: CreateCompletionRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createCompletionRequest' is not null or undefined
      assertParamExists(
        'createCompletion',
        'createCompletionRequest',
        createCompletionRequest
      )
      const localVarPath = `/completions`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createCompletionRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Creates a new edit for the provided input, instruction, and parameters.
     * @param {CreateEditRequest} createEditRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createEdit: async (
      createEditRequest: CreateEditRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createEditRequest' is not null or undefined
      assertParamExists(
        'createEdit',
        'createEditRequest',
        createEditRequest
      )
      const localVarPath = `/edits`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createEditRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Creates an embedding vector representing the input text.
     * @param {CreateEmbeddingRequest} createEmbeddingRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createEmbedding: async (
      createEmbeddingRequest: CreateEmbeddingRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createEmbeddingRequest' is not null or undefined
      assertParamExists(
        'createEmbedding',
        'createEmbeddingRequest',
        createEmbeddingRequest
      )
      const localVarPath = `/embeddings`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createEmbeddingRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {CreateFineTuneRequest} createFineTuneRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createFineTune: async (
      createFineTuneRequest: CreateFineTuneRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createFineTuneRequest' is not null or undefined
      assertParamExists(
        'createFineTune',
        'createFineTuneRequest',
        createFineTuneRequest
      )
      const localVarPath = `/fine-tunes`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createFineTuneRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Creates an image given a prompt.
     * @param {CreateImageRequest} createImageRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createImage: async (
      createImageRequest: CreateImageRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createImageRequest' is not null or undefined
      assertParamExists(
        'createImage',
        'createImageRequest',
        createImageRequest
      )
      const localVarPath = `/images/generations`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createImageRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Classifies if text violates OpenAI\'s Content Policy
     * @param {CreateModerationRequest} createModerationRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModeration: async (
      createModerationRequest: CreateModerationRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createModerationRequest' is not null or undefined
      assertParamExists(
        'createModeration',
        'createModerationRequest',
        createModerationRequest
      )
      const localVarPath = `/moderations`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createModerationRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
     * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
     * @param {CreateSearchRequest} createSearchRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createSearch: async (
      engineId: string,
      createSearchRequest: CreateSearchRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'engineId' is not null or undefined
      assertParamExists('createSearch', 'engineId', engineId)
      // verify required parameter 'createSearchRequest' is not null or undefined
      assertParamExists(
        'createSearch',
        'createSearchRequest',
        createSearchRequest
      )
      const localVarPath = `/engines/{engine_id}/search`.replace(
        `{${'engine_id'}}`,
        encodeURIComponent(String(engineId))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      localVarHeaderParameter['Content-Type'] = 'application/json'
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        createSearchRequest,
        localVarRequestOptions,
        configuration
      )
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Delete a file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteFile: async (
      fileId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'fileId' is not null or undefined
      assertParamExists('deleteFile', 'fileId', fileId)
      const localVarPath = `/files/{file_id}`.replace(
        `{${'file_id'}}`,
        encodeURIComponent(String(fileId))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'DELETE',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
     * @param {string} model The model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModel: async (
      model: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'model' is not null or undefined
      assertParamExists('deleteModel', 'model', model)
      const localVarPath = `/models/{model}`.replace(
        `{${'model'}}`,
        encodeURIComponent(String(model))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'DELETE',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Returns the contents of the specified file
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    downloadFile: async (
      fileId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'fileId' is not null or undefined
      assertParamExists('downloadFile', 'fileId', fileId)
      const localVarPath = `/files/{file_id}/content`.replace(
        `{${'file_id'}}`,
        encodeURIComponent(String(fileId))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    listEngines: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/engines`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Returns a list of files that belong to the user\'s organization.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFiles: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/files`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Get fine-grained status updates for a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to get events for.
     * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFineTuneEvents: async (
      fineTuneId: string,
      stream?: boolean,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'fineTuneId' is not null or undefined
      assertParamExists(
        'listFineTuneEvents',
        'fineTuneId',
        fineTuneId
      )
      const localVarPath =
        `/fine-tunes/{fine_tune_id}/events`.replace(
          `{${'fine_tune_id'}}`,
          encodeURIComponent(String(fineTuneId))
        )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      if (stream !== undefined) {
        localVarQueryParameter.stream = stream
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary List your organization\'s fine-tuning jobs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFineTunes: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/fine-tunes`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listModels: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/models`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
     * @param {string} engineId The ID of the engine to use for this request
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    retrieveEngine: async (
      engineId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'engineId' is not null or undefined
      assertParamExists('retrieveEngine', 'engineId', engineId)
      const localVarPath = `/engines/{engine_id}`.replace(
        `{${'engine_id'}}`,
        encodeURIComponent(String(engineId))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Returns information about a specific file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveFile: async (
      fileId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'fileId' is not null or undefined
      assertParamExists('retrieveFile', 'fileId', fileId)
      const localVarPath = `/files/{file_id}`.replace(
        `{${'file_id'}}`,
        encodeURIComponent(String(fileId))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {string} fineTuneId The ID of the fine-tune job
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveFineTune: async (
      fineTuneId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'fineTuneId' is not null or undefined
      assertParamExists('retrieveFineTune', 'fineTuneId', fineTuneId)
      const localVarPath = `/fine-tunes/{fine_tune_id}`.replace(
        `{${'fine_tune_id'}}`,
        encodeURIComponent(String(fineTuneId))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @param {string} model The ID of the model to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveModel: async (
      model: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'model' is not null or undefined
      assertParamExists('retrieveModel', 'model', model)
      const localVarPath = `/models/{model}`.replace(
        `{${'model'}}`,
        encodeURIComponent(String(model))
      )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }
      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any
      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      }
    }
  }
}
/**
 * OpenAIApi - functional programming interface
 * @export
 */
export const OpenAIApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    OpenAIApiAxiosParamCreator(configuration)
  return {
    /**
     *
     * @summary Immediately cancel a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to cancel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cancelFineTune(
      fineTuneId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<FineTune>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.cancelFineTune(
          fineTuneId,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
     * @param {CreateAnswerRequest} createAnswerRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async createAnswer(
      createAnswerRequest: CreateAnswerRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateAnswerResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createAnswer(
          createAnswerRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Creates a completion for the chat message
     * @param {CreateChatCompletionRequest} createChatCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createChatCompletion(
      createChatCompletionRequest: CreateChatCompletionRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateChatCompletionResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createChatCompletion(
          createChatCompletionRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
     * @param {CreateClassificationRequest} createClassificationRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async createClassification(
      createClassificationRequest: CreateClassificationRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateClassificationResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createClassification(
          createClassificationRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Creates a completion for the provided prompt and parameters
     * @param {CreateCompletionRequest} createCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createCompletion(
      createCompletionRequest: CreateCompletionRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateCompletionResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createCompletion(
          createCompletionRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    async createAccountBillingUsage(
      createAccountBillingUsageRequest: CreateAccountBillingUsageRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateAccountBillingUsageResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createAccountBillingUsage(
          createAccountBillingUsageRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    async createAccountSubscription(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateAccountSubscriptionResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createAccountSubscription(
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Creates a new edit for the provided input, instruction, and parameters.
     * @param {CreateEditRequest} createEditRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createEdit(
      createEditRequest: CreateEditRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateEditResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createEdit(
          createEditRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Creates an embedding vector representing the input text.
     * @param {CreateEmbeddingRequest} createEmbeddingRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createEmbedding(
      createEmbeddingRequest: CreateEmbeddingRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateEmbeddingResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createEmbedding(
          createEmbeddingRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {CreateFineTuneRequest} createFineTuneRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createFineTune(
      createFineTuneRequest: CreateFineTuneRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<FineTune>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createFineTune(
          createFineTuneRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Creates an image given a prompt.
     * @param {CreateImageRequest} createImageRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createImage(
      createImageRequest: CreateImageRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ImagesResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createImage(
          createImageRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Classifies if text violates OpenAI\'s Content Policy
     * @param {CreateModerationRequest} createModerationRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createModeration(
      createModerationRequest: CreateModerationRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateModerationResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createModeration(
          createModerationRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
     * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
     * @param {CreateSearchRequest} createSearchRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async createSearch(
      engineId: string,
      createSearchRequest: CreateSearchRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreateSearchResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createSearch(
          engineId,
          createSearchRequest,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Delete a file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteFile(
      fileId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<DeleteFileResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deleteFile(fileId, options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
     * @param {string} model The model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteModel(
      model: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<DeleteModelResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deleteModel(model, options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Returns the contents of the specified file
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadFile(
      fileId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<string>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.downloadFile(fileId, options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async listEngines(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ListEnginesResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listEngines(options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Returns a list of files that belong to the user\'s organization.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listFiles(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ListFilesResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listFiles(options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Get fine-grained status updates for a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to get events for.
     * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listFineTuneEvents(
      fineTuneId: string,
      stream?: boolean,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ListFineTuneEventsResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listFineTuneEvents(
          fineTuneId,
          stream,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary List your organization\'s fine-tuning jobs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listFineTunes(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ListFineTunesResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listFineTunes(options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listModels(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ListModelsResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listModels(options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
     * @param {string} engineId The ID of the engine to use for this request
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async retrieveEngine(
      engineId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<Engine>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.retrieveEngine(
          engineId,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Returns information about a specific file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async retrieveFile(
      fileId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<OpenAIFile>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.retrieveFile(fileId, options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {string} fineTuneId The ID of the fine-tune job
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async retrieveFineTune(
      fineTuneId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<FineTune>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.retrieveFineTune(
          fineTuneId,
          options
        )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @param {string} model The ID of the model to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async retrieveModel(
      model: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<Model>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.retrieveModel(model, options)
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      )
    }
  }
}
/**
 * OpenAIApi - factory interface
 * @export
 */
export const OpenAIApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = OpenAIApiFp(configuration)
  return {
    /**
     *
     * @summary Immediately cancel a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to cancel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cancelFineTune(
      fineTuneId: string,
      options?: any
    ): AxiosPromise<FineTune> {
      return localVarFp
        .cancelFineTune(fineTuneId, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
     * @param {CreateAnswerRequest} createAnswerRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createAnswer(
      createAnswerRequest: CreateAnswerRequest,
      options?: any
    ): AxiosPromise<CreateAnswerResponse> {
      return localVarFp
        .createAnswer(createAnswerRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Creates a completion for the chat message
     * @param {CreateChatCompletionRequest} createChatCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createChatCompletion(
      createChatCompletionRequest: CreateChatCompletionRequest,
      options?: any
    ): AxiosPromise<CreateChatCompletionResponse> {
      return localVarFp
        .createChatCompletion(createChatCompletionRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
     * @param {CreateClassificationRequest} createClassificationRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createClassification(
      createClassificationRequest: CreateClassificationRequest,
      options?: any
    ): AxiosPromise<CreateClassificationResponse> {
      return localVarFp
        .createClassification(createClassificationRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Creates a completion for the provided prompt and parameters
     * @param {CreateCompletionRequest} createCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCompletion(
      createCompletionRequest: CreateCompletionRequest,
      options?: any
    ): AxiosPromise<CreateCompletionResponse> {
      return localVarFp
        .createCompletion(createCompletionRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Creates a new edit for the provided input, instruction, and parameters.
     * @param {CreateEditRequest} createEditRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createEdit(
      createEditRequest: CreateEditRequest,
      options?: any
    ): AxiosPromise<CreateEditResponse> {
      return localVarFp
        .createEdit(createEditRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Creates an embedding vector representing the input text.
     * @param {CreateEmbeddingRequest} createEmbeddingRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createEmbedding(
      createEmbeddingRequest: CreateEmbeddingRequest,
      options?: any
    ): AxiosPromise<CreateEmbeddingResponse> {
      return localVarFp
        .createEmbedding(createEmbeddingRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {CreateFineTuneRequest} createFineTuneRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createFineTune(
      createFineTuneRequest: CreateFineTuneRequest,
      options?: any
    ): AxiosPromise<FineTune> {
      return localVarFp
        .createFineTune(createFineTuneRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Creates an image given a prompt.
     * @param {CreateImageRequest} createImageRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createImage(
      createImageRequest: CreateImageRequest,
      options?: any
    ): AxiosPromise<ImagesResponse> {
      return localVarFp
        .createImage(createImageRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Classifies if text violates OpenAI\'s Content Policy
     * @param {CreateModerationRequest} createModerationRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModeration(
      createModerationRequest: CreateModerationRequest,
      options?: any
    ): AxiosPromise<CreateModerationResponse> {
      return localVarFp
        .createModeration(createModerationRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
     * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
     * @param {CreateSearchRequest} createSearchRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createSearch(
      engineId: string,
      createSearchRequest: CreateSearchRequest,
      options?: any
    ): AxiosPromise<CreateSearchResponse> {
      return localVarFp
        .createSearch(engineId, createSearchRequest, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Delete a file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteFile(
      fileId: string,
      options?: any
    ): AxiosPromise<DeleteFileResponse> {
      return localVarFp
        .deleteFile(fileId, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
     * @param {string} model The model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModel(
      model: string,
      options?: any
    ): AxiosPromise<DeleteModelResponse> {
      return localVarFp
        .deleteModel(model, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Returns the contents of the specified file
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    downloadFile(
      fileId: string,
      options?: any
    ): AxiosPromise<string> {
      return localVarFp
        .downloadFile(fileId, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    listEngines(options?: any): AxiosPromise<ListEnginesResponse> {
      return localVarFp
        .listEngines(options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Returns a list of files that belong to the user\'s organization.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFiles(options?: any): AxiosPromise<ListFilesResponse> {
      return localVarFp
        .listFiles(options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Get fine-grained status updates for a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to get events for.
     * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFineTuneEvents(
      fineTuneId: string,
      stream?: boolean,
      options?: any
    ): AxiosPromise<ListFineTuneEventsResponse> {
      return localVarFp
        .listFineTuneEvents(fineTuneId, stream, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary List your organization\'s fine-tuning jobs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFineTunes(
      options?: any
    ): AxiosPromise<ListFineTunesResponse> {
      return localVarFp
        .listFineTunes(options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listModels(options?: any): AxiosPromise<ListModelsResponse> {
      return localVarFp
        .listModels(options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
     * @param {string} engineId The ID of the engine to use for this request
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    retrieveEngine(
      engineId: string,
      options?: any
    ): AxiosPromise<Engine> {
      return localVarFp
        .retrieveEngine(engineId, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Returns information about a specific file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveFile(
      fileId: string,
      options?: any
    ): AxiosPromise<OpenAIFile> {
      return localVarFp
        .retrieveFile(fileId, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {string} fineTuneId The ID of the fine-tune job
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveFineTune(
      fineTuneId: string,
      options?: any
    ): AxiosPromise<FineTune> {
      return localVarFp
        .retrieveFineTune(fineTuneId, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @param {string} model The ID of the model to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveModel(model: string, options?: any): AxiosPromise<Model> {
      return localVarFp
        .retrieveModel(model, options)
        .then((request) => request(axios, basePath))
    }
  }
}
/**
 * OpenAIApi - object-oriented interface
 * @export
 * @class OpenAIApi
 * @extends {BaseAPI}
 */
export class OpenAIApi extends BaseAPI {
  /**
   *
   * @summary Immediately cancel a fine-tune job.
   * @param {string} fineTuneId The ID of the fine-tune job to cancel
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public cancelFineTune(
    fineTuneId: string,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .cancelFineTune(fineTuneId, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
   * @param {CreateAnswerRequest} createAnswerRequest
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createAnswer(
    createAnswerRequest: CreateAnswerRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createAnswer(createAnswerRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Creates a completion for the chat message
   * @param {CreateChatCompletionRequest} createChatCompletionRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createChatCompletion(
    createChatCompletionRequest: CreateChatCompletionRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createChatCompletion(createChatCompletionRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  public createAccountBillingUsage(
    createAccountBillingUsageRequest: CreateAccountBillingUsageRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createAccountBillingUsage(
        createAccountBillingUsageRequest,
        options
      )
      .then((request) => request(this.axios, this.basePath))
  }
  public createAccountSubscription(options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .createAccountSubscription(options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
   * @param {CreateClassificationRequest} createClassificationRequest
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createClassification(
    createClassificationRequest: CreateClassificationRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createClassification(createClassificationRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Creates a completion for the provided prompt and parameters
   * @param {CreateCompletionRequest} createCompletionRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createCompletion(
    createCompletionRequest: CreateCompletionRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createCompletion(createCompletionRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Creates a new edit for the provided input, instruction, and parameters.
   * @param {CreateEditRequest} createEditRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createEdit(
    createEditRequest: CreateEditRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createEdit(createEditRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Creates an embedding vector representing the input text.
   * @param {CreateEmbeddingRequest} createEmbeddingRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createEmbedding(
    createEmbeddingRequest: CreateEmbeddingRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createEmbedding(createEmbeddingRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
   * @param {CreateFineTuneRequest} createFineTuneRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createFineTune(
    createFineTuneRequest: CreateFineTuneRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createFineTune(createFineTuneRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Creates an image given a prompt.
   * @param {CreateImageRequest} createImageRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createImage(
    createImageRequest: CreateImageRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createImage(createImageRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Classifies if text violates OpenAI\'s Content Policy
   * @param {CreateModerationRequest} createModerationRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createModeration(
    createModerationRequest: CreateModerationRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createModeration(createModerationRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
   * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
   * @param {CreateSearchRequest} createSearchRequest
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public createSearch(
    engineId: string,
    createSearchRequest: CreateSearchRequest,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .createSearch(engineId, createSearchRequest, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Delete a file.
   * @param {string} fileId The ID of the file to use for this request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public deleteFile(fileId: string, options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .deleteFile(fileId, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
   * @param {string} model The model to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public deleteModel(model: string, options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .deleteModel(model, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Returns the contents of the specified file
   * @param {string} fileId The ID of the file to use for this request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public downloadFile(fileId: string, options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .downloadFile(fileId, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public listEngines(options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .listEngines(options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Returns a list of files that belong to the user\'s organization.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public listFiles(options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .listFiles(options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Get fine-grained status updates for a fine-tune job.
   * @param {string} fineTuneId The ID of the fine-tune job to get events for.
   * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public listFineTuneEvents(
    fineTuneId: string,
    stream?: boolean,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .listFineTuneEvents(fineTuneId, stream, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary List your organization\'s fine-tuning jobs
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public listFineTunes(options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .listFineTunes(options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public listModels(options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .listModels(options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
   * @param {string} engineId The ID of the engine to use for this request
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public retrieveEngine(
    engineId: string,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .retrieveEngine(engineId, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Returns information about a specific file.
   * @param {string} fileId The ID of the file to use for this request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public retrieveFile(fileId: string, options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .retrieveFile(fileId, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
   * @param {string} fineTuneId The ID of the fine-tune job
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public retrieveFineTune(
    fineTuneId: string,
    options?: AxiosRequestConfig
  ) {
    return OpenAIApiFp(this.configuration)
      .retrieveFineTune(fineTuneId, options)
      .then((request) => request(this.axios, this.basePath))
  }
  /**
   *
   * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
   * @param {string} model The ID of the model to use for this request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  public retrieveModel(model: string, options?: AxiosRequestConfig) {
    return OpenAIApiFp(this.configuration)
      .retrieveModel(model, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
