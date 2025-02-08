import axios from 'axios';

    const DEEPSEEK_API_KEY = 'sk-b302991363424b0e89d5f2dc53cae13b';
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
    const DEEPSEEK_VISION_URL = 'https://api.deepseek.com/v1/vision/chat/completions';

    interface DeepSeekMessage {
      role: 'user' | 'assistant' | 'system';
      content: string;
    }

    interface DeepSeekVisionMessage {
      role: 'user' | 'assistant' | 'system';
      content: Array<{ type: 'text' | 'image_url', text?: string, image_url?: { url: string } }>;
    }

    export async function deepseekChat(messages: DeepSeekMessage[], model: string = 'deepseek-chat'): Promise<string | null> {
      try {
        const response = await axios.post(DEEPSEEK_API_URL, {
          model,
          messages,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
          return response.data.choices[0].message.content;
        }
        return null;
      } catch (error) {
        console.error('Error during DeepSeek chat:', error);
        return null;
      }
    }

    export async function deepseekVisionChat(messages: DeepSeekVisionMessage[], model: string = 'deepseek-vision'): Promise<string | null> {
      try {
        const response = await axios.post(DEEPSEEK_VISION_URL, {
          model,
          messages,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
          return response.data.choices[0].message.content;
        }
        return null;
      } catch (error) {
        console.error('Error during DeepSeek vision chat:', error);
        return null;
      }
    }
