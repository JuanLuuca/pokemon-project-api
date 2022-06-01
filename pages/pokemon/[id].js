import Head from 'next/head'
import Link from 'next/link';
import styles from '../../styles/Details.module.css';
import React from 'react';

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);
  
  const data = await response.json();
  
    return {
      props: {
        repo: data  
      }
    };
}

export default function Home({ repo }) {
    return (
        <div>
            <Head>
                <title>{repo.name}</title>
            </Head>
            <div className={styles.button}>
                <Link href="/">
                    <a>Voltar para Home</a>
                </Link>
            </div>
            <div className={styles.layout}>
                <div>
                    <img 
                        className={styles.picture}
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${repo.image}`}
                        alt={repo.name.english}
                    />
                </div>
                <div>
                    <div className={styles.name}>{repo.name}</div>
                    <div className={styles.type}>{repo.type.join(", ")}</div>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repo.stats.map((item) => (
                                <tr className={styles.body} key={item.name}>
                                    <td className={styles.attribute}>{item.name}</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
  }
  