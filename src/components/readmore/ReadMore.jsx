const ReadMore = () => {
    const shortText = text.slice(0, maxLength) +  '...' ;

    return (
      <>
        <p>{shortText}</p>
        <Link href="">
          <span>
            Read more
          </span>
        </Link>
      </>
    );
  };

export default ReadMore