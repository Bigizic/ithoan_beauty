import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../../API_URL';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { LoadingIndicator } from '../../components/Common/LoadingIndicator';
import toast from 'react-hot-toast';

interface NewsletterUnsubscribeState {
  email: string;
  isLoading: boolean;
  formErrors: { email?: string };
}

class NewsletterUnsubscribeClass extends React.PureComponent<
  { email: string; navigate: (path: string) => void },
  NewsletterUnsubscribeState
> {
  constructor(props: { email: string; navigate: (path: string) => void }) {
    super(props);
    this.state = {
      email: props.email || '',
      isLoading: false,
      formErrors: {}
    };
  }

  componentDidMount() {
    if (this.props.email) {
      this.setState({ email: this.props.email });
    }
  }

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value, formErrors: {} });
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email } = this.state;

    if (!email) {
      this.setState({ formErrors: { email: 'Email is required' } });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ formErrors: { email: 'Email format is invalid' } });
      return;
    }

    this.setState({ isLoading: true });

    try {
      const response = await API_URL.post({
        type: 'newsletter_beauty_unsubscribe',
        id: email,
        data: {}
      });

      toast.success(response.message || 'Successfully unsubscribed from newsletter');
      this.setState({ email: '', formErrors: {} });
      setTimeout(() => {
        this.props.navigate('/');
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to unsubscribe');
      setTimeout(() => {
        this.props.navigate('/');
      }, 2000);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { email, isLoading, formErrors } = this.state;

    return (
      <div className='unsubscribe-newsletter-form max-w-md mx-auto px-4 py-12'>
        {isLoading && <LoadingIndicator />}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-4'>Unsubscribe from Newsletter</h1>
          <p className='text-gray-600'>
            Confirm the email you want to unsubscribe from our beauty newsletter
          </p>
        </div>
        <form onSubmit={this.handleSubmit} className='space-y-6'>
          <div>
            <Input
              type='email'
              name='email'
              placeholder='Please Enter Your Email'
              value={email}
              onChange={this.handleEmailChange}
              className='w-full'
            />
            {formErrors.email && (
              <p className='text-red-500 text-sm mt-2'>{formErrors.email}</p>
            )}
          </div>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
          </Button>
        </form>
      </div>
    );
  }
}

const NewsletterUnsubscribe: React.FC = () => {
  const params = useParams<{ email: string }>();
  const navigate = useNavigate();

  let decodedEmail = '';
  if (params.email) {
    try {
      decodedEmail = atob(params.email);
    } catch (error) {
      console.error('Failed to decode email:', error);
    }
  }

  return <NewsletterUnsubscribeClass email={decodedEmail} navigate={navigate} />;
};

export default NewsletterUnsubscribe;
